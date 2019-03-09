import React from 'react'
import MapView from 'react-native-maps'
import { connect } from "react-redux";
import {askLocationPermission,fetchLocation, fetchEcocenters,updateLocation} from '../../actions/location'

class MapScreen extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidUpdate = () => {
    this.props.updateLocation()
  }
  render() {
    const{ coords: {latitude, longitude}} = this.props.location
    return (
<MapView
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    )
  }
}

function bindAction(dispatch) {
  return {
    askLocationPermission: () => dispatch(askLocationPermission()),
    updateLocation: () => dispatch(updateLocation())
  };
}

const mapStateToProps = state => ({
  location: state.locationReducer.location,
  fetchedLocation: state.locationReducer.fetchedLocation,
  ecocenters: state.locationReducer.ecocenters
});
export default connect(mapStateToProps, bindAction)(MapScreen);
