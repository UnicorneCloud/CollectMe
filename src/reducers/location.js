const initialState = {
  location: null,
  
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "SET_LOCATION_SUCCESS":
      return {...state, location: action.location};
    default:
      return state;
  }
}
