import { getFrequence } from '../utils/GeoUtils'
import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'

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

export const WEEK_DAYS_INT_MAP = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 0
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

export const COLLECT_TYPES = {
  GARBAGE: 'Garbage',
  RECYCLING: 'Recycling'
}

export const createFrequence = (iterableOfDay, everyXWeek, startDate, endDate) => {
  days = new Set(iterableOfDay)
  daysInt = iterableOfDay.map(x => WEEK_DAYS_INT_MAP[x]) // 0 = sunday
  return {
    days: days,
    daysInt: daysInt,
    startDate:  startDate,
    endDate: endDate,
    period: everyXWeek
  };
};

export const getCollectScheduleData = (location) => {
  location.latitude = 46.8115809
  location.longitude = -71.2335447
  const locationPoint = { type: 'Point', coordinates: [location.longitude, location.latitude] };
  const collectScheduleDataByType = [
    [COLLECT_TYPES.GARBAGE, require('../../data/dechets.json')], 
    [COLLECT_TYPES.RECYCLING, require('../../data/recyclable.json')]
  ]
  return collectScheduleDataByType.reduce((result, [key, data]) => {
    const glookup = new GeoJsonGeometriesLookup(data);
    const container = glookup.getContainers(locationPoint);
    if(container.features.length > 0){
      const frequency = getFrequence(container.features[0])
      result[key] = frequency
    }
    return result
  }, {})
}