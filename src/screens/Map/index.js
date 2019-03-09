import React from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import {
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Spinner
} from "native-base";
import {askLocationPermission,fetchLocation, fetchEcocenters,updateLocation} from '../../actions/location'
import styles from "./styles";
const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");

class MapScreen extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidUpdate = () => {
    this.props.updateLocation()
  }
  render() {
    const {coords} = this.props.location
    const{ latitude, longitude} = coords
    console.log(coords)
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon active name="menu" />
          </Button>
        </Left>
        <Body>
          <Image source={headerLogo} style={styles.imageHeader} />
        </Body>
        <Right />
      </Header>
        <View style={{flex:1, backgroundColor: 'powderblue'}}>
 <MapView
 showsUserLocation
 style={styles.map}
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
  </MapView>
  </View>
  </Container>
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
