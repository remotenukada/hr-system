export function calculateRuleBasedNextGrantDate(
  hireDate: Date,
): Date {
  const today = new Date();

  const firstGrantDate = new Date(hireDate);
  firstGrantDate.setMonth(
    firstGrantDate.getMonth() + 6,
  );

  if (today < firstGrantDate) {
    return firstGrantDate;
  }

  const currentYear = today.getFullYear();

  const april1ThisYear = new Date(
    currentYear,
    3,
    1,
  );

  if (today < april1ThisYear) {
    return april1ThisYear;
  }

  return new Date(
    currentYear + 1,
    3,
    1,
  );
}

export function calculateLeaveServiceMonths(
  hireDate: Date,
  grantDate: Date,
): number {
  return (
    (grantDate.getFullYear() -
      hireDate.getFullYear()) *
      12 +
    (grantDate.getMonth() -
      hireDate.getMonth())
  );
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
    nextGrantDate.toDateString() ===
    firstGrantDate.toDateString()
  ) {
    return "初回付与";
  }

  return "定期付与";
}

export function calculateAnnualGrantBreakdown(
  hireDate: Date,
  employmentType: string | null,
) {
  const nextGrantDate =
    calculateRuleBasedNextGrantDate(
      hireDate,
    );

  const serviceMonths =
    (nextGrantDate.getFullYear() -
      hireDate.getFullYear()) *
      12 +
    (nextGrantDate.getMonth() -
      hireDate.getMonth());

  const isFullTime =
    employmentType === "FULL_TIME";

  if (serviceMonths < 12) {
    return {
      legalDays: 10,
      specialDays: 0,
      totalDays: 10,
    };
  }

  if (!isFullTime) {
    return {
      legalDays: 10,
      specialDays: 0,
      totalDays: 10,
    };
  }

  if (serviceMonths < 24) {
    return {
      legalDays: 11,
      specialDays: 5,
      totalDays: 16,
    };
  }

  if (serviceMonths < 36) {
    return {
      legalDays: 12,
      specialDays: 5,
      totalDays: 17,
    };
  }

  if (serviceMonths < 48) {
    return {
      legalDays: 14,
      specialDays: 5,
      totalDays: 19,
    };
  }

  if (serviceMonths < 60) {
    return {
      legalDays: 16,
      specialDays: 4,
      totalDays: 20,
    };
  }

  if (serviceMonths < 72) {
    return {
      legalDays: 18,
      specialDays: 2,
      totalDays: 20,
    };
  }

  return {
    legalDays: 20,
    specialDays: 0,
    totalDays: 20,
  };
}

export function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}
