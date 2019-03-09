import { WebBrowser, Constants, Location, Permissions } from 'expo';
export {
  itemsHasErrored,
  itemsIsLoading,
  itemsFetchDataSuccess,
  itemsFetchData
} from "../screens/Home/actions";

export const getLocation  = () => {
  return dispatch => {
    Permissions.askAsync(Permissions.LOCATION).then((res) => {
      if (res.status !== 'granted') {
        console.error('location permission denied')
        dispatch(setLocation(null))
      }else {
        Location.getCurrentPositionAsync({}).then(res => {
          dispatch(setLocation(res))
        })
      }
    })
  }
};
export function setLocation(location: any){
  return {
    type: "SET_LOCATION_SUCCESS",
    location
  };
}