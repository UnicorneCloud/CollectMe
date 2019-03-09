import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'
import dayjs from 'dayjs'

import { getFrequence } from '../utils/GeoUtils'
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
  GARBAGE: 'déchets',
  RECYCLING: 'recyclage'
}

export const createFrequence = (iterableOfDay, everyXWeek) => {
  return {
    days: new Set(iterableOfDay),
    period: everyXWeek
  };
};

export const getCollectScheduleData = (location) => {
  location.latitude = 46.8784799
  location.longitude = -71.348191
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

/**
 * 
 * @param {Object} collectSchedule { days: Set, startDate: Date, period: Number }
 * @returns Next collect days generator
 * }
 */
export function* upcomingCollectDates (collectSchedule) {
  const now = dayjs()
  const startDate = dayjs(collectSchedule.startDate)
  const weeksSinceCollectStart = now.diff(startDate, 'week')
  const weeksSinceLastCollect = weeksSinceCollectStart % collectSchedule.period
  const weeksUntilNextCollect = period - weeksSinceLastCollect
  let nextCollectDay = now.add(weeksUntilNextCollect, 'week').set('day', 0)

  while(true){
    for(day in collectSchedule.days){
      nextCollectDay = nextCollectDay.set('day', day)
      yield nextCollectDay
    }
    nextCollectDay.add(collectSchedule.period, 'week')
  }
}

export const getUpcomingCollectDates = (collectSchedules, count = 14) => {
  const upcomingCollectDates = []
  const upcomingCollectDatesGenerator = upcomingCollectDates(collectSchedules)
  for(let i=0; i<count; ++i){
    upcomingCollectDates.push(upcomingCollectDatesGenerator.next())
  }
  return upcomingCollectDates
}

