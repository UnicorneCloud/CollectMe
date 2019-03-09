export const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WEEK_DAYS_MAP = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday"
};

export const COLLECT_PERIOD_IN_DATA = {
  SEMAINE: "chaque semaine",
  BIMENSUEL: "chaque 2 semaines"
};

export const WEEK_DAYS_IN_DATA = {
  MONDAY: "lundi",
  TUESDAY: "mardi",
  WEDNESDAY: "mercredi",
  THURSDAY: "jeudi",
  FRIDAY: "vendredi",
  SATURDAY: "samedi",
  SUNDAY: "dimanche"
};

export const createFrequence = (iterableOfDay, everyXWeek) => {
  return {
    days: new Set(iterableOfDay),
    period: everyXWeek
  };
};