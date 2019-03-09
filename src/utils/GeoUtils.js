const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities();
import { WEEK_DAYS_MAP, COLLECT_PERIOD_IN_DATA, WEEK_DAYS_IN_DATA, createFrequence } from "./model";

export const getFrequence = (feature) => {
  const collectDays = feature.properties.JOUR_COLLECTE;
  const startDate = new Date(feature.properties.DATE_DEBUT);
  const endDate = feature.properties.DATE_FIN ? new Date(feature.properties.DATE_FIN) : null;
  return createFrequence(
    extractWeekDays(collectDays).map(e => getWeekDay(e)),
    getPeriod(collectDays),
    startDate,
    endDate
  );
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
      return "la semaine des 4 jeudis";
  }
};

export const extractWeekDays = (aString) => {
  return aString.split(",").slice(0, -1).map(e => e.trim());
};

export const getPeriod = (aString) => {
  if (aString.includes(COLLECT_PERIOD_IN_DATA.SEMAINE)) {
    return 1;
  } else if (aString.includes(COLLECT_PERIOD_IN_DATA.BIMENSUEL)) {
    return 2;
  }
};

export const distanceBetweenCoordinates = (a,b) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(b[1]-a[1]);  // deg2rad below
    var dLon = deg2rad(b[0]-b[0]); 
    var c = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(a[1])) * Math.cos(deg2rad(b[1])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1-c)); 
    var distance = R * d; // Distance in km
    return distance;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

export const ecocenterMarkers = (ecocenters) => {
  return ecocenters.filter(e => e.lat != null && e.lng != null && e.lat != "" && e.lng != "").map(e => ({
    coord: {
      latitude: Number(e.lat) || 0,
      longitude: Number(e.lng) || 0
    },
    title: entities.decode(e.store),
    description: entities.decode(e.description).replace(/<(?:.|\n)*?>/gm, '')
  }))
}

export const geoJsonToCoord = (geojson) => {
  return {
    latitude: geojson.coordinates[1] || 0,
    longitude: geojson.coordinates[0] || 0
  }
}