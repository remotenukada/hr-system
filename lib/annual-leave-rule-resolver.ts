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
