import { 
    SET_ALL_GEOMETRIES
  } from '../utils/actionTypes'
  
export const setAllGeometries = (geometries) => {
    return {
        type: SET_ALL_GEOMETRIES,
        geometries
    }
}


