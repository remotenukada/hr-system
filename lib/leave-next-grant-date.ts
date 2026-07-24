export function calculateNextLeaveGrantDate(
  hireDate: Date,
) {
  const now = new Date();

  const firstGrantDate = new Date(hireDate);
  firstGrantDate.setMonth(firstGrantDate.getMonth() + 6);

  if (now < firstGrantDate) {
    return firstGrantDate;
  }

  const currentYear = now.getFullYear();

  const aprilFirst = new Date(
    currentYear,
    3,
    1,
  );

  if (now < aprilFirst) {
    return aprilFirst;
  }

  return new Date(
    currentYear + 1,
    3,
    1,
  );
}
