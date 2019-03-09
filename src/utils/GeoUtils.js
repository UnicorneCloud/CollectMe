import {WEEK_DAYS_MAP, WEEK_DAYS, COLLECT_PERIOD_IN_DATA, WEEK_DAYS_IN_DATA, createFrequence} from './model';

export const getFrequence = (feature) => {
  const collectDays = feature.properties.JOUR_COLLECTE;



  return {};
};

export const getWeekDay = (frenchDay) => {
  switch (frenchDay) {
    case WEEK_DAYS_IN_DATA.MONDAY:
      return WEEK_DAYS_MAP.MONDAY;
    case WEEK_DAYS_IN_DATA.TUESDAY:
      return WEEK_DAYS_MAP.TUESDAY;
    case WEEK_DAYS_IN_DATA.WEDNESDAY:
      return WEEK_DAYS_MAP.WEDNESDAY;
    case WEEK_DAYS_IN_DATA.THURSDAY:
      return WEEK_DAYS_MAP.THURSDAY;
    case WEEK_DAYS_IN_DATA.FRIDAY:
      return WEEK_DAYS_MAP.FRIDAY;
    case WEEK_DAYS_IN_DATA.SATURDAY:
      return WEEK_DAYS_MAP.SATURDAY;
    case WEEK_DAYS_IN_DATA.SUNDAY:
      return WEEK_DAYS_MAP.SUNDAY;
    default:
      return "la semaine des 4 jeudis"
  }
};

export const getPeriod = (aString) => {
  if(aString.includes(COLLECT_PERIOD_IN_DATA.SEMAINE)){
    return 1;
  } else if (aString.includes(COLLECT_PERIOD_IN_DATA.BIMENSUEL)){
    return 2;
  }
};