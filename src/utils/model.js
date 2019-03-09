export const DAYS_OF_THE_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const createFrequence = (iterableOfDay, everyXWeek) => {
  return new Map([
    ["days", new Set(iterableOfDay)],
    ["period", everyXWeek]
  ])
};