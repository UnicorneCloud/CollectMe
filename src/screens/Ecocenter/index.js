// @flow
import React, { Component } from "react";
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

import styles from "./styles";
const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png")

class Ecocenter extends React.Component {
  componentDidMount = () => {
    if(this.props.location == null){
      this.props.getLocation()
    }
    console.log(this.props.location)
  }

   render() {
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
        <Right />
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
      >
      </Content>
      </Container>
     )
  }
}
function bindAction(dispatch) {
  return {
    getLocation: () => dispatch(getLocation())
  };
}

const mapStateToProps = state => ({
  location: state.locationReducer.location
});
export default connect(mapStateToProps, bindAction)(Ecocenter);
