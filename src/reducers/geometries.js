import { SET_ALL_GEOMETRIES } from '../utils/actionTypes'

const initialState = {
  allGeometries: {
    data: [],
    error: null,
    fetchInProgress: false
  }
}

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    case SET_ALL_GEOMETRIES:
      return {
        ...state,
        allGeometries: {
          ...state.allGeometries,
          data: action.geometries
        }
      };
    default:
      return state;
  }
}

