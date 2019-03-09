import { 
  SET_ALL_COLLECT_SCHEDULES 
} from '../utils/actionTypes'


export const setAllCollectSchedules = (collectSchedules) => {
  return {
    type: SET_ALL_COLLECT_SCHEDULES,
    collectSchedules
  }
}