import React, { Component } from "react";
import {
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView,
  Linking,
  TextInput,
  WebView,
  ActivityIndicator
} from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import get from 'lodash/get'
import { ListItem, SearchBar } from 'react-native-elements'
import { connect } from "react-redux";
import {
  Container,
  Header,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
} from "native-base";
import styles from "./styles";
import { distanceBetweenCoordinates } from '../../utils/GeoUtils'
import ecocenterData from "../../../data/ecocentre.json"
import { MenuProvider } from 'react-native-popup-menu'
import { askLocationPermission, fetchLocation, fetchEcocenters, updateLocation } from '../../actions/location'

const headerLogo = require("../../../assets/header-logo.png")
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities();

class Ecocenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationStr: get(props, 'fetchedLocation.formatted', '')
    }
  }

  componentDidMount() {
    if (this.props.location == null) {
      this.props.askLocationPermission()
    }
    const geometry = get(this.props, 'fetchedLocation.geometry')
    if (geometry) {
      this.props.fetchEcocenters([geometry.lng, geometry.lat])
    }
  }

  componentDidUpdate(prevProps) {
    if (get(prevProps, 'fetchedLocation.formatted') !== get(this.props, 'fetchedLocation.formatted')) {
      this.setState({ locationStr: get(this.props, 'fetchedLocation.formatted') })
      const geometry = get(this.props, 'fetchedLocation.geometry')
      this.props.fetchEcocenters([geometry.lng, geometry.lat])
    }
  }

  searchLocation = async (locationStr) => {
    if (locationStr !== '') {
      this.props.fetchLocation(locationStr)
    } else {
      this.setState({ locationStr: get(this.props, 'fetchedLocation.formatted') })
    }
  };

  updateLocationString = (locationStr) => {
    this.setState({ locationStr: locationStr })
  };

  openStore = (lng, lat, label) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  _renderItem = ({ item }) => {
    if (item.properties && item.properties["NOM_TOPOGRAPHIE"]) {
      return this._renderEcocenter(item)
    }
    return (
      <ListItem
        // leftAvatar={{ source: { uri: l.avatar_url } }}
        title={entities.decode(item.store)}
        subtitle={
          <RNView>
            <Grid >
              <Row>
                <Col style={{ flexDirection: "row" }}>
                  <Text style={styles.newsLink}>
                    {entities.decode(item.description.replace(/<(?:.|\n)*?>/gm, ''))}
                  </Text>
                </Col>

              </Row>
              <Row>
                <Col>
                  {item.url ?
                    <Text style={styles.newsLink} onPress={() => Linking.openURL(item.url)}>
                      {item.url.match(/([a-zA-Z]*\.){1,2}([a-zA-Z]*)/)[0]}
                    </Text> : null
                  }
                </Col>
              </Row>
            </Grid>
          </RNView>
        }
        rightIcon={
          <RNView>
            <Icon name="bicycle" style={styles.timeIcon} />
            <Text style={styles.newsLink}>
              {item.distance.toFixed(1)}km
        </Text>
          </RNView>
        }
        containerStyle={{
          borderBottomWidth: 1
        }}
        onPress={() => this.openStore(item.lng, item.lat, entities.decode(item.store))}
      />
    )

  };

  _renderEcocenter = (item) => {
    const { coords: { latitude, longitude } } = this.props.location
    return (
      <ListItem
        key={`${item.geometry.coordinates[0]}${item.geometry.coordinates[1]}`}
        // leftAvatar={{ source: { uri: l.avatar_url } }}
        title={item.properties["NOM_TOPOGRAPHIE"]}
        subtitle={
          <RNView>
            <Grid >
              <Row>
                <Col style={{ flexDirection: "row" }}>
                  <Text style={styles.newsLink}>
                    Écocentre officiel {'\n'}
                  </Text>
                </Col>
              </Row>
            </Grid>
          </RNView>
        }
        rightIcon={
          <RNView>
            <Icon name="bicycle" style={styles.timeIcon} />
            <Text style={styles.newsLink}>
              {distanceBetweenCoordinates([longitude, latitude], item.geometry.coordinates).toFixed(1)}km
        </Text>
          </RNView>
        }
        containerStyle={{
          borderBottomWidth: 1
        }}
        onPress={() => this.openStore(item.geometry.coordinates[0], item.geometry.coordinates[1], item.properties["NOM_TOPOGRAPHIE"])}
      />
    )
  };

  render() {
    const { ecocenters } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this.props.updateLocation()}>
              <Icon active name="locate" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'white'
        }}>
          <SearchBar
            platform={Platform.OS}
            onChange={e => this.updateLocationString(e.nativeEvent.text)}
            onSubmitEditing={e => this.searchLocation(e.nativeEvent.text)}
            value={this.state.locationStr} />
          <MenuProvider>
            <FlatList
              data={[...ecocenterData, ...ecocenters]}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index} />
          </MenuProvider>
        </View>
      </Container>
    )
  }
}
function bindAction(dispatch) {
  return {
    askLocationPermission: () => dispatch(askLocationPermission()),
    fetchLocation: (search) => dispatch(fetchLocation(search)),
    fetchEcocenters: (coord) => dispatch(fetchEcocenters(coord)),
    updateLocation: () => dispatch(updateLocation())
  };
}

const mapStateToProps = state => ({
  location: state.locationReducer.location,
  fetchedLocation: state.locationReducer.fetchedLocation,
  ecocenters: state.locationReducer.ecocenters
});
export default connect(mapStateToProps, bindAction)(Ecocenter);
