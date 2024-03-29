import GeoJsonGeometriesLookup from 'geojson-geometries-lookup'
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
  GARBAGE: 'garbage',
  RECYCLING: 'recyclage',
  GREEN_RESIDUES: 'green residues'
}

export const createFrequence = (iterableOfDay, everyXWeek, startDate, endDate) => {
  days = new Set(iterableOfDay)
  daysInt = iterableOfDay.map(x => WEEK_DAYS_INT_MAP[x]) // 0 = sunday
  return {
    days: days,
    daysInt: daysInt,
    startDate: startDate,
    endDate: endDate,
    period: everyXWeek
  };
};

makeContainers = (data, location) => {
  const locationPoint = { type: 'Point', coordinates: [location.longitude, location.latitude] };
  (new GeoJsonGeometriesLookup(data)).getContainers(locationPoint)
}

export const getAllGeometriesMock = (location) => {
  const geometries = {}
  geometries[COLLECT_TYPES.GARBAGE] = makeContainers(require('../../data/dechets.json'), location)
  geometries[COLLECT_TYPES.RECYCLING] = makeContainers(require('../../data/recyclable.json'), location)
  return geometries
}

export const getCollectScheduleData = (location = { latitude: 46.8784799, longitude: -71.348191 }) => {
  const locationPoint = { type: 'Point', coordinates: [location.longitude, location.latitude] };
  const collectScheduleDataByType = [
    [COLLECT_TYPES.GARBAGE, require('../../data/dechets.json')],
    [COLLECT_TYPES.RECYCLING, require('../../data/recyclable.json')],
    [COLLECT_TYPES.GREEN_RESIDUES, require('../../data/residusverts.json')]
  ]
  return collectScheduleDataByType.reduce((result, [key, data]) => {
    const glookup = new GeoJsonGeometriesLookup(data);
    const container = glookup.getContainers(locationPoint);

    if (container.features.length > 0) {
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
export function* upcomingCollectDates(collectSchedule) {
  const now = dayjs()
  const startDate = dayjs(collectSchedule.startDate)
  const weeksSinceCollectStart = now.diff(startDate, 'week')
  const weeksSinceLastCollect = weeksSinceCollectStart % collectSchedule.period
  const weeksUntilNextCollect = collectSchedule.period - weeksSinceLastCollect
  let nextCollectDay = now.add(weeksUntilNextCollect, 'week').set('day', 0)

  while (true) {
    for (const day in collectSchedule.daysInt) {
      nextCollectDay = nextCollectDay.set('day', day)
      yield nextCollectDay
    }
    nextCollectDay = nextCollectDay.add(collectSchedule.period, 'week')
  }
}

export const getUpcomingCollectDates = (collectSchedule, count) => {
  const dates = []
  const upcomingCollectDatesGenerator = upcomingCollectDates(collectSchedule)
  for (let i = 0; i < count; ++i) {
    dates.push(upcomingCollectDatesGenerator.next().value)
  }
  return dates
}

