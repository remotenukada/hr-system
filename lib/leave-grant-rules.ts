type LeaveGrantPlanItem = {
  grantDate: Date;
  grantedDays: number;
  grantType: "LEGAL" | "SPECIAL";
  note: string;
};

type FullTimeInitialRule = {
  month: number;
  firstHalf: boolean;
  specialGrants: {
    month: number;
    yearOffset: number;
    days: number;
  }[];
};

const FULL_TIME_INITIAL_RULES: FullTimeInitialRule[] = [
  { month: 1, firstHalf: true, specialGrants: [{ month: 8, yearOffset: 0, days: 1 }, { month: 9, yearOffset: 0, days: 1 }, { month: 1, yearOffset: 1, days: 3 }] },
  { month: 1, firstHalf: false, specialGrants: [{ month: 8, yearOffset: 0, days: 1 }, { month: 9, yearOffset: 0, days: 1 }, { month: 1, yearOffset: 1, days: 2 }] },

  { month: 2, firstHalf: true, specialGrants: [{ month: 9, yearOffset: 0, days: 1 }, { month: 10, yearOffset: 0, days: 1 }, { month: 2, yearOffset: 1, days: 2 }] },
  { month: 2, firstHalf: false, specialGrants: [{ month: 9, yearOffset: 0, days: 1 }, { month: 10, yearOffset: 0, days: 1 }, { month: 2, yearOffset: 1, days: 1 }] },

  { month: 3, firstHalf: true, specialGrants: [{ month: 10, yearOffset: 0, days: 1 }, { month: 11, yearOffset: 0, days: 1 }, { month: 3, yearOffset: 1, days: 1 }] },
  { month: 3, firstHalf: false, specialGrants: [{ month: 10, yearOffset: 0, days: 1 }, { month: 11, yearOffset: 0, days: 1 }, { month: 3, yearOffset: 1, days: 0 }] },

  { month: 4, firstHalf: true, specialGrants: [{ month: 11, yearOffset: 0, days: 1 }, { month: 12, yearOffset: 0, days: 1 }] },
  { month: 4, firstHalf: false, specialGrants: [{ month: 11, yearOffset: 0, days: 1 }, { month: 12, yearOffset: 0, days: 1 }] },

  { month: 5, firstHalf: true, specialGrants: [{ month: 12, yearOffset: 0, days: 1 }, { month: 1, yearOffset: 1, days: 1 }] },
  { month: 5, firstHalf: false, specialGrants: [{ month: 12, yearOffset: 0, days: 1 }, { month: 1, yearOffset: 1, days: 1 }] },

  { month: 6, firstHalf: true, specialGrants: [{ month: 1, yearOffset: 1, days: 1 }, { month: 2, yearOffset: 1, days: 1 }] },
  { month: 6, firstHalf: false, specialGrants: [{ month: 1, yearOffset: 1, days: 1 }, { month: 2, yearOffset: 1, days: 1 }] },

  { month: 7, firstHalf: true, specialGrants: [{ month: 2, yearOffset: 1, days: 1 }, { month: 3, yearOffset: 1, days: 1 }] },
  { month: 7, firstHalf: false, specialGrants: [{ month: 2, yearOffset: 1, days: 1 }, { month: 3, yearOffset: 1, days: 1 }] },

  { month: 8, firstHalf: true, specialGrants: [{ month: 3, yearOffset: 1, days: 1 }] },
  { month: 8, firstHalf: false, specialGrants: [{ month: 3, yearOffset: 1, days: 1 }] },

  { month: 9, firstHalf: true, specialGrants: [] },
  { month: 9, firstHalf: false, specialGrants: [] },

  { month: 10, firstHalf: true, specialGrants: [{ month: 5, yearOffset: 1, days: 1 }, { month: 6, yearOffset: 1, days: 1 }, { month: 10, yearOffset: 1, days: 6 }] },
  { month: 10, firstHalf: false, specialGrants: [{ month: 5, yearOffset: 1, days: 1 }, { month: 6, yearOffset: 1, days: 1 }, { month: 10, yearOffset: 1, days: 5 }] },

  { month: 11, firstHalf: true, specialGrants: [{ month: 6, yearOffset: 1, days: 1 }, { month: 7, yearOffset: 1, days: 1 }, { month: 11, yearOffset: 1, days: 5 }] },
  { month: 11, firstHalf: false, specialGrants: [{ month: 6, yearOffset: 1, days: 1 }, { month: 7, yearOffset: 1, days: 1 }, { month: 11, yearOffset: 1, days: 4 }] },

  { month: 12, firstHalf: true, specialGrants: [{ month: 7, yearOffset: 1, days: 1 }, { month: 8, yearOffset: 1, days: 1 }, { month: 12, yearOffset: 1, days: 4 }] },
  { month: 12, firstHalf: false, specialGrants: [{ month: 7, yearOffset: 1, days: 1 }, { month: 8, yearOffset: 1, days: 1 }, { month: 12, yearOffset: 1, days: 3 }] },
];

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month - 1, 1);
}

export function buildFullTimeInitialLeaveGrantPlan(
  hireDate: Date,
): LeaveGrantPlanItem[] {
  const hireMonth = hireDate.getMonth() + 1;
  const hireDay = hireDate.getDate();
  const firstHalf = hireDay <= 15;

  const rule = FULL_TIME_INITIAL_RULES.find(
    (x) => x.month === hireMonth && x.firstHalf === firstHalf,
  );

  if (!rule) {
    return [];
  }

  const legalGrantDate = addMonths(hireDate, 6);

  const results: LeaveGrantPlanItem[] = [
    {
      grantDate: legalGrantDate,
      grantedDays: 10,
      grantType: "LEGAL",
      note: "初年度 法定付与",
    },
  ];

  for (const special of rule.specialGrants) {
    if (special.days <= 0) {
      continue;
    }

    results.push({
      grantDate: firstDayOfMonth(
        hireDate.getFullYear() + special.yearOffset,
        special.month,
      ),
      grantedDays: special.days,
      grantType: "SPECIAL",
      note: "初年度 特別休暇",
    });
  }

  return results;
}
export function getLeaveGrantCategory(
  hireDate: Date,
): string {
  const nextGrantDate =
    calculateRuleBasedNextGrantDate(
      hireDate,
    );

  const firstGrantDate = new Date(hireDate);
  firstGrantDate.setMonth(
    firstGrantDate.getMonth() + 6,
  );

  if (
    nextGrantDate.getTime() ===
    firstGrantDate.getTime()
  ) {
    return "初回付与";
  }

  return "定期付与";
}
function calculateRuleBasedNextGrantDate(
  hireDate: Date,
) {
  const result = new Date(hireDate);
  result.setMonth(result.getMonth() + 6);
  return result;
}
