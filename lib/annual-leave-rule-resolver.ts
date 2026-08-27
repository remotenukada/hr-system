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
) {
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
