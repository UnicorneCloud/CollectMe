import React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import Drawer from "react-native-drawer";

import {
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
  View as RNView,
  Switch
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
import {
  askLocationPermission,
  fetchLocation,
  fetchEcocenters,
  updateLocation
} from "../../actions/location";
import styles from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ecocenterMarkers, geoJsonToCoord } from "../../utils/GeoUtils";
import composteData from "../../../data/composte.json";
import { ListItem, SearchBar } from 'react-native-elements'
const headerLogo = require("../../../assets/header-logo.png");
const deviceWidth = Dimensions.get("window").width;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this._map
    this.state = {
      filters: {
        ecocenters: true,
        composte: true
      }
    };
  }

  componentDidMount = () => {
    this.props.updateLocation();
    if(this.props.ecocenters.length === 0 ){
      this.props.fetchEcocenters()
    }
  };

  makeIconComposte = (filters) => {
    return filters.composte ?
      <MaterialCommunityIcons name="map-marker" style={styles.toggleMarker} size={20} color="#8B4513"/>
      :
      <MaterialCommunityIcons name="map-marker-off" style={styles.toggleMarker} size={20} color="grey"/>
  };

  makeIconEcocentre = (filters) => {
    return filters.ecocenters ?
      <MaterialCommunityIcons name="map-marker" style={styles.toggleMarker} size={20} color="#28840F"/>
      :
      <MaterialCommunityIcons name="map-marker-off" style={styles.toggleMarker} size={20} color="grey"/>
  };

  openStore = (lng, lat, label) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  openFilter = () => {
    this._drawer.open();
  };

  closeFilter = () => {
    this._drawer.close();
  };

  render() {
    const {
      location: { coords },
      ecocenters
    } = this.props;
    const { latitude, longitude } = coords;
    const { filters } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={this.openFilter}
            >
              <Icon active name="funnel" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: "powderblue" }}>
          <Drawer
            ref={ref => (this._drawer = ref)}
            type="overlay"
            tapToClose={true}
            side="right"
            openDrawerOffset={100}
            content={
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <ListItem
                  title="Compostes communautaires"
                  leftAvatar={this.makeIconEcocentre(filters)}
                  rightIcon={
                    <Switch
                      value={filters.ecocenters}
                      onValueChange={e =>
                        this.setState({ filters: { ...filters, ecocenters: e } })
                      }/>
                  }
                  containerStyle={{
                    borderBottomWidth: 1
                  }}
                />
                <ListItem
                  title="Écocentres"
                  leftAvatar={this.makeIconComposte(filters)}
                  rightIcon={
                    <Switch
                      value={filters.composte}
                      onValueChange={e =>
                        this.setState({ filters: { ...filters, composte: e } })
                      }/>
                  }
                  containerStyle={{
                    borderBottomWidth: 1
                  }}
                />
              </View>
            }
          >
            <MapView
            followsUserLocatio
            showsMyLocationButton
              showsUserLocation
              style={styles.map}
              initialRegion={{
                latitude: latitude || 0,
                longitude: longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {filters.ecocenters &&
                ecocenterMarkers(ecocenters).map(marker => (
                  <Marker
                    pinColor="#28840F"
                    coordinate={marker.coord}
                    title={marker.title}
                    description={marker.description}
                  >
                    <Callout
                    style={{borderRadius: 4}}
                      onPress={() =>
                        this.openStore(
                          marker.coord.longitude,
                          marker.coord.latitude,
                          marker.title
                        )
                      }
                    >
                    <RNView style={{maxWidth: deviceWidth - 30, paddingTop: 5, paddingLeft: 5, paddingRight: 5, paddingBottom:5,borderRadius: 4}}>
                      <Text style={{color: 'black'}}>{marker.title}</Text>
                      <Text style={{color: 'gray', fontSize: 13}}>{marker.description}</Text>
                      <Text style={{color: 'blue', fontSize: 13, paddingTop: 5}}>Itinéraire</Text>
                      </RNView>
                      </Callout>
                  </Marker>
                ))}
              {filters.composte &&
                composteData.composteCommunautaire.map(composte => {
                  const coord = geoJsonToCoord(composte.geometry);
                  return (
                    <Marker
                      pinColor="#8B4513"
                      coordinate={coord}
                      title={composte.nom + " - Composte communautaire"}
                    >
                      <Callout
                        onPress={() =>
                          this.openStore(
                            coord.longitude,
                            coord.latitude,
                            composte.nom
                          )
                        }
                      >
                      <RNView style={{maxWidth: deviceWidth - 30, paddingTop: 5, paddingLeft: 5, paddingRight: 5, paddingBottom:5}}>
                      <Text style={{color: 'black', maxWidth: deviceWidth - 30}}>{composte.nom + " - Composte communautaire"}</Text>
                      <Text style={{color: 'blue', fontSize: 13, paddingTop: 5}}>Itinéraire</Text>
                      </RNView>
                      </Callout>
                    </Marker>
                  );
                })}
            </MapView>
          </Drawer>
        </View>
      </Container>
    );
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
export default connect(
  mapStateToProps,
  bindAction
)(MapScreen);