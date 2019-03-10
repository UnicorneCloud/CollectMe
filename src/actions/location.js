import { Location, Permissions } from 'expo';


export const askLocationPermission  = () => {
  console.log('askpermission')
  return (dispatch,getState) => {
    Permissions.askAsync(Permissions.LOCATION).then((res) => {
      if (res.status !== 'granted') {
        console.error('location permission denied')
        dispatch(setLocation(null))
      }else {
        Location.getCurrentPositionAsync({}).then(res => {
          dispatch(setLocation(res))
          if(getState().locationReducer.fetchedLocation == null){
            const{ coords: {latitude, longitude}} = res
            dispatch(fetchLocation([latitude, longitude]))
          }
        })
      }
    })
  }
};

export const fetchLocation = (search) => {
  console.log('fetchLocation')
  return (dispatch,getState) => {
    const query = Array.isArray(search) ? `${search[0]}+${search[1]}` : search
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=1c886d010a164f299c4101c98f151cd9`).then(res => {
      res.json().then(json => {
          dispatch(fetchLocationSuccess(json.results[0]))
          if(getState().locationReducer.ecocenters.length === 0 ){
            dispatch(fetchEcocenters(json.results[0].geometry.lat, json.results[0].geometry.lng))
          }
        })
    })
  }
}

export const fetchEcocenters = (coord) => {
  console.log('fetchEcocenter')
  return dispatch => {
    fetch(`https://www.recyclermeselectroniques.ca/qc/wp-admin/admin-ajax.php?action=store_search&lat=${Number(coord[1]).toFixed(5)}&lng=${Number(coord[0]).toFixed(5)}&max_results=500&search_radius=50&autoload=1`).then(res => {
    res.json().then(json => {
        dispatch(fetchEcocentersSuccess(json))
      })
    })
  }
}

export const updateLocation = () => {
  console.log('updateLocation')
  return (dispatch, getState) => {
    const{ coords: {latitude, longitude}} = getState().locationReducer.location
    dispatch(fetchLocation([latitude, longitude]))
  }
}
export const fetchLocationSuccess = (fetchedLocation) => {
  return {
    type: "FETCH_LOCATION_SUCCESS",
    fetchedLocation
  }
}
export const fetchEcocentersSuccess = (ecocenters) => {
  return {
    type: "FETCH_ECOCENTERS_SUCCESS",
    ecocenters : ecocenters || []
  }
}

export function setLocation(location: any){
return {
    type: "SET_LOCATION_SUCCESS",
    location
  };
}