import { SET_ALL_COLLECT_SCHEDULES } from '../utils/actionTypes'


const initialState = {
  allCollectSchedules: {
    data: [],
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

