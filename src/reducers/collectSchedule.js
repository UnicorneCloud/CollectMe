import { SET_ALL_COLLECT_SCHEDULES } from '../utils/actionTypes'
import { createCollectSchedule } from '../utils/model'
import { getFrequence } from '../utils/GeoUtils'

const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');

const geojson = require('../../data/dechets.json')

const glookup = new GeoJsonGeometriesLookup(geojson);

// const latitude = 46.8169586;
// const longitude = -71.2371529;

const latitude = 46.8115809;
const longitude = -71.2335447;


const point1 = { type: 'Point', coordinates: [longitude, latitude] };
const container = glookup.getContainers(point1);

const initialState = {
  allCollectSchedules: {
    data: container.features.map(feature => createCollectSchedule(getFrequence(feature), 'garbage')),
    error: null,
    fetchInProgress: false
  }
}

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    case SET_ALL_COLLECT_SCHEDULES:
      return {
        ...state,
        allCollectSchedules: {
          ...state.allCollectSchedules,
          data: action.collectSchedules
        }
      };
    default:
      return state;
  }
}

