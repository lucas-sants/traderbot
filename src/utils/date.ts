export const getMinutesBetweenDates = (
  startDate: Date,
  endDate: Date
): number => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};
