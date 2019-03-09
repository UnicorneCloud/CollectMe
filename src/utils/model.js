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

export const createFrequence = (iterableOfDay, everyXWeek) => {
  return {
    days: new Set(iterableOfDay),
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