const initialState = {
  location: null,
  fetchedLocation: null,
  ecocenters: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "SET_LOCATION_SUCCESS":
      return {...state, location: action.location};
    case "FETCH_LOCATION_SUCCESS":
      return {...state, fetchedLocation: action.fetchedLocation}
    case "FETCH_ECOCENTERS_SUCCESS":
      return {...state, ecocenters: action.ecocenters}
    default:
      return state;
  }
}
