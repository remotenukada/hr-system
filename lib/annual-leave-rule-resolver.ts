type EntryRule = {
  legalGrantAfterMonths: number;
  legalDays: number;
  specialGrant1AfterMonths: number | null;
  specialGrant1Days: number;
  specialGrant2AfterMonths: number | null;
  specialGrant2Days: number;
  specialGrant3AfterMonths: number | null;
  specialGrant3Days: number;
  nextAprilDays: number;
};

export type AnnualGrantEvent = {
  grantDate: Date;
  days: number;
  grantType: "LEGAL" | "SPECIAL";
  note: string;
};

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function buildInitialGrantSchedule(
  hireDate: Date,
  rule: EntryRule,
): AnnualGrantEvent[] {
  const events: AnnualGrantEvent[] = [
    {
      grantDate: addMonths(hireDate, rule.legalGrantAfterMonths),
      days: rule.legalDays,
      grantType: "LEGAL",
      note: "年次有給休暇 初回法定付与",
    },
  ];

  const specials = [
    {
      months: rule.specialGrant1AfterMonths,
      days: rule.specialGrant1Days,
      label: "特別休暇①",
    },
    {
      months: rule.specialGrant2AfterMonths,
      days: rule.specialGrant2Days,
      label: "特別休暇②",
    },
    {
      months: rule.specialGrant3AfterMonths,
      days: rule.specialGrant3Days,
      label: "特別休暇③",
    },
  ];

  for (const special of specials) {
    if (special.months !== null && special.days > 0) {
      events.push({
        grantDate: addMonths(hireDate, special.months),
        days: special.days,
        grantType: "SPECIAL",
        note: `年次有給休暇 ${special.label}`,
      });
    }
  }

  return events.sort((a, b) => a.grantDate.getTime() - b.grantDate.getTime());
}

export function findEntryRule<
  T extends {
    entryMonth: number;
    dayFrom: number;
    dayTo: number;
  },
>(hireDate: Date, rules: T[]): T | null {
  const month = hireDate.getMonth() + 1;
  const day = hireDate.getDate();

  return (
    rules.find(
      (rule) =>
        rule.entryMonth === month && day >= rule.dayFrom && day <= rule.dayTo,
    ) ?? null
  );
}

import { prisma } from "@/lib/prisma";

type GrantHistory = {
  grantDate: Date;
  grantType: string;
  note: string | null;
};

function sameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function resolveNextAnnualGrantEvent(
  hireDate: Date,
  employmentType: string | null,
  histories: GrantHistory[],
  conditions?: StatutoryWorkConditions,
) {
  if (employmentType === "PART_TIME") {
    if (!conditions) {
      return null;
    }

    return resolveStatutoryAnnualGrantEvent(hireDate, histories, conditions);
  }

  if (employmentType !== "FULL_TIME") {
    return null;
  }

  const entryRules = await prisma.annualLeaveEntryRule.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const entryRule = findEntryRule(hireDate, entryRules);

  if (!entryRule) {
    return null;
  }

  const today = new Date();
  const initialEvents = buildInitialGrantSchedule(hireDate, entryRule);

  const pendingInitialEvent = initialEvents.find((event) => {
    if (event.grantDate > today) {
      return false;
    }

    return !histories.some(
      (history) =>
        history.grantType === event.grantType &&
        history.note === event.note &&
        sameDate(new Date(history.grantDate), event.grantDate),
    );
  });

  if (pendingInitialEvent) {
    return {
      ...pendingInitialEvent,
      category: "初年度付与",
    };
  }

  const currentYear = today.getFullYear();
  const aprilThisYear = new Date(currentYear, 3, 1);
  const regularGrantDate =
    today >= aprilThisYear ? aprilThisYear : new Date(currentYear - 1, 3, 1);

  const firstRegularGrantDate = new Date(
    hireDate.getMonth() >= 3
      ? hireDate.getFullYear() + 2
      : hireDate.getFullYear() + 1,
    3,
    1,
  );

  if (regularGrantDate < firstRegularGrantDate) {
    return null;
  }

  const regularGrantYears =
    regularGrantDate.getFullYear() - firstRegularGrantDate.getFullYear();

  const ruleServiceMonths = 18 + regularGrantYears * 12;

  const serviceRule = await prisma.annualLeaveServiceRule.findFirst({
    where: {
      isActive: true,
      serviceMonths: {
        lte: ruleServiceMonths,
      },
    },
    orderBy: {
      serviceMonths: "desc",
    },
  });

  if (!serviceRule) {
    return null;
  }

  const alreadyGranted = histories.some(
    (history) =>
      sameDate(new Date(history.grantDate), regularGrantDate) &&
      history.note?.includes("定期付与"),
  );

  if (alreadyGranted) {
    return null;
  }

  const specialDays = serviceRule.specialDays;

  return {
    grantDate: regularGrantDate,
    legalDays: serviceRule.legalDays,
    specialDays,
    days: Math.min(
      serviceRule.legalDays + specialDays,
      serviceRule.maxTotalDays,
    ),
    grantType: "LEGAL" as const,
    note: "年次有給休暇 定期付与",
    category: "定期付与",
  };
}

type StatutoryWorkConditions = {
  weeklyScheduledDays: number | null;
  weeklyScheduledHours: number | null;
  annualScheduledDays: number | null;
};

function getStatutoryRuleMonths(serviceMonths: number) {
  const ruleMonths = [78, 66, 54, 42, 30, 18, 6];

  return ruleMonths.find((months) => serviceMonths >= months) ?? null;
}

function getProportionalWeeklyDays(conditions: StatutoryWorkConditions) {
  const annualDays = conditions.annualScheduledDays;

  if (annualDays !== null) {
    if (annualDays >= 169 && annualDays <= 216) return 4;
    if (annualDays >= 121 && annualDays <= 168) return 3;
    if (annualDays >= 73 && annualDays <= 120) return 2;
    if (annualDays >= 48 && annualDays <= 72) return 1;
  }

  const weeklyDays = conditions.weeklyScheduledDays;

  if (
    weeklyDays !== null &&
    Number.isInteger(weeklyDays) &&
    weeklyDays >= 1 &&
    weeklyDays <= 4
  ) {
    return weeklyDays;
  }

  return null;
}

export async function resolveStatutoryAnnualGrantEvent(
  hireDate: Date,
  histories: GrantHistory[],
  conditions: StatutoryWorkConditions,
) {
  const today = new Date();

  const elapsedMonths =
    (today.getFullYear() - hireDate.getFullYear()) * 12 +
    today.getMonth() -
    hireDate.getMonth();

  const ruleMonths = getStatutoryRuleMonths(elapsedMonths);

  if (ruleMonths === null) {
    return null;
  }

  const grantDate = addMonths(hireDate, ruleMonths);

  if (grantDate > today) {
    return null;
  }

  const note = `年次有給休暇 法定付与 ${ruleMonths}か月`;

  const alreadyGranted = histories.some(
    (history) =>
      sameDate(new Date(history.grantDate), grantDate) && history.note === note,
  );

  if (alreadyGranted) {
    return null;
  }

  const normalGrant =
    (conditions.weeklyScheduledHours ?? 0) >= 30 ||
    (conditions.weeklyScheduledDays ?? 0) >= 5 ||
    (conditions.annualScheduledDays ?? 0) >= 217;

  let days: number;

  if (normalGrant) {
    const serviceRule = await prisma.annualLeaveServiceRule.findUnique({
      where: {
        serviceMonths: ruleMonths,
      },
    });

    if (!serviceRule?.isActive) {
      return null;
    }

    days = serviceRule.legalDays;
  } else {
    const weeklyDays = getProportionalWeeklyDays(conditions);

    if (weeklyDays === null) {
      return null;
    }

    const rule = await prisma.partTimeAnnualLeaveRule.findUnique({
      where: {
        weeklyScheduledDays: weeklyDays,
      },
    });

    if (!rule?.isActive) {
      return null;
    }

    switch (ruleMonths) {
      case 6:
        days = rule.days6Months;
        break;
      case 18:
        days = rule.days18Months;
        break;
      case 30:
        days = rule.days30Months;
        break;
      case 42:
        days = rule.days42Months;
        break;
      case 54:
        days = rule.days54Months;
        break;
      case 66:
        days = rule.days66Months;
        break;
      case 78:
        days = rule.days78Months;
        break;
      default:
        return null;
    }
  }

  return {
    grantDate,
    legalDays: days,
    specialDays: 0,
    days,
    grantType: "LEGAL" as const,
    note,
    category: normalGrant ? "法定通常付与" : "法定比例付与",
  };
}
