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

export function calculateAnnualGrantDays(
  hireDate: Date,
): number {
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

  if (serviceMonths < 12) {
    return 10;
  }

  if (serviceMonths < 24) {
    return 16;
  }

  if (serviceMonths < 36) {
    return 17;
  }

  if (serviceMonths < 48) {
    return 19;
  }

  return 20;
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
