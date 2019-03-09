import { SET_ALL_COLLECT_SCHEDULES } from '../utils/actionTypes'
import { createCollectSchedule, createFrequence, WEEK_DAYS_MAP, COLLECT_TYPES } from '../utils/model'

const dummyCollectSchedules = [
  createCollectSchedule(createFrequence([WEEK_DAYS_MAP.MONDAY], 1), COLLECT_TYPES.THRASH),
  createCollectSchedule(createFrequence([WEEK_DAYS_MAP.TUESDAY], 1), COLLECT_TYPES.RECYCLING),
  createCollectSchedule(createFrequence([WEEK_DAYS_MAP.WEDNESDAY], 2), COLLECT_TYPES.RECYCLING),
  createCollectSchedule(createFrequence([WEEK_DAYS_MAP.FRIDAY], 2), COLLECT_TYPES.THRASH)
]

const initialState = {
  allCollectSchedules: {
    data: dummyCollectSchedules,
    error: null,
    fetchInProgress: false
  }
}

export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case SET_ALL_COLLECT_SCHEDULES:
      return {
        ...state, 
        allCollectSchedules: {
          ...state.allCollectSchedules,
          data: action.collectSchedules
        }};
    default:
      return state;
  }
}

