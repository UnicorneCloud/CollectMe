// @flow
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
import { Grid, Col,Row } from "react-native-easy-grid";

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
  Spinner,
  Toast
} from "native-base";

import styles from "./styles";
const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png")
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
import ecocenter from "../../../data/ecocentre.json"

class Ecocenter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ecocenters: ecocenter,
      locationStr: ""
    }
  }

  componentDidMount = () => {
    if(this.props.location == null){
      this.props.askLocationPermission()
    }
    const{ coords: {latitude, longitude}} = this.props.location
    fetch(`https://www.recyclermeselectroniques.ca/qc/wp-admin/admin-ajax.php?action=store_search&lat=${Number(latitude).toFixed(5)}&lng=${Number(longitude).toFixed(5)}&max_results=500&search_radius=30&autoload=1`).then(res => {
    res.json().then(json => {
        this.setState({ecocenters: [...ecocenter, ...json], isLoading: false})
      })
    })
    if(this.props.location){
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1c886d010a164f299c4101c98f151cd9`).then(res => {
      res.json().then(json => {
          this.setState({locationStr: json.results[0].formatted})
        })
      })
    }
  }

  updateLocationStr = async(locationStr) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${locationStr}&key=1c886d010a164f299c4101c98f151cd9`).then(res => {
      res.json().then(json => {
          if(!json.results || json.results.length === 0 ){
            Toast.show({
              text: "Adresse invalide",
              duration: 2500,
              position: "bottom",
              textStyle: { textAlign: "center" }
            });
          }else {
            const {lat, lng} = json.results[0].geometry
            const formattedAddress = json.results[0].formatted
            this.setState({locationStr: formattedAddress})
            fetch(`https://www.recyclermeselectroniques.ca/qc/wp-admin/admin-ajax.php?action=store_search&lat=${Number(lat).toFixed(5)}&lng=${Number(lng).toFixed(5)}&max_results=500&search_radius=30&autoload=1`).then(res => {
              res.json().then(json => {
                  this.setState({ecocenters: [...ecocenter, ...json]})
                })
              })
          }
        })
      }) 
  }

  openStore = (lat, lng, label) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  _renderItem = ({ item }) => {
    if(item.properties && item.properties["NOM_TOPOGRAPHIE"]){
      return this._renderEcocenter(item)
    }
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => this.openStore(item.lat, item.lng, entitites.decode(item.store))}
      >
        <View style={styles.newsContent}>
          <Text numberOfLines={2} style={styles.newsHeader}>
          {entities.decode(item.store)}
          </Text>
          <Grid style={styles.swiperContentBox}>
          <Row>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.newsLink}>
                {entities.decode(item.description.replace(/<(?:.|\n)*?>/gm, ''))}
              </Text>
            </Col>
            </Row>
            <Row>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.newsLink}>
                Distance: {item.distance}km
              </Text>
            </Col>
            </Row>
            <Row>
            <Col style={{ flexDirection: "row" }} onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.newsLink}>
                {item.url}
              </Text>
            </Col>
            </Row>
          </Grid>
        </View>
      </TouchableOpacity>
    );
  };

  _renderEcocenter = (item) => {
    return (<TouchableOpacity
    style={{ flexDirection: "row" }}
    onPress={() => this.openStore(item.geometry.coordinates[0], item.geometry.coordinates[1], item.properties["NOM_TOPOGRAPHIE"])}
  >
    <View style={styles.newsContent}>
      <Text numberOfLines={2} style={styles.newsHeader}>
      {item.properties["NOM_TOPOGRAPHIE"]}
      </Text>
      <Grid style={styles.swiperContentBox}>
          <Row>
          <Col style={{ flexDirection: "row" }} onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.newsLink}>
                Écocentre officiel
              </Text>
            </Col>
          </Row>
          </Grid>
    </View>
    </TouchableOpacity> )
  }
   render() {
     const {ecocenters} = this.state
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
        <Right />
      </Header>
      <View style={{    justifyContent: 'center',
      flex: 1,
      backgroundColor:'white'}}>
      <TextInput
        style={{paddingLeft: 10, paddingRight: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
        onSubmitEditing={e => this.updateLocationStr(e.nativeEvent.text)}
        value={this.state.locationStr}/>
        <FlatList
          data={ecocenters}
          renderItem={this._renderItem}
          keyExtractor={item => item.lat + item.lng}/>
      </View>
      </Container>
     )
  }
}
function bindAction(dispatch) {
  return {
    askLocationPermission: () => dispatch(askLocationPermission())
  };
}

const mapStateToProps = state => ({
  location: state.locationReducer.location
});
export default connect(mapStateToProps, bindAction)(Ecocenter);
