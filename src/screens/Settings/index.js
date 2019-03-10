// @flow
var Color = require("color");
import React, { Component } from "react";
import { Image, Switch, TouchableOpacity, Platform } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  Item,
  Input,
  View,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;
const light = Color(primary).alpha(0.3);

type Props = {
  navigation: () => void
};
class Settings extends Component {
  state: {
    monSwitch: true,
    tueSwitch: false,
    wedSwitch: false,
    thuSwitch: false,
    friSwitch: false,
    satSwitch: false,
    sunSwitch: false,
    Username: "",
    email: "",
    password: "",
    offset: {
      x: 0,
      y: 0
    }
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      monSwitch: true,
      tueSwitch: false,
      wedSwitch: false,
      thuSwitch: false,
      friSwitch: false,
      satSwitch: false,
      sunSwitch: false,
      Username: "",
      email: "",
      password: "",
      offset: {
        x: 0,
        y: 0
      }
    };
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right />
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.signupHeader}>SETTINGS</Text>
            <View style={styles.profileButtons}>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Thumbnail
                  source={require("../../../assets/DefaultIcon.png")}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.notificationSwitchContainer}>
            <Text style={styles.notificationHeader}>NOTIFICATIONS DE COLLECTES</Text>
            <View>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Collectes de déchets
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ monSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.monSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Collectes du recyclage
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ tueSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.tueSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Collectes de résidus verts
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ wedSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.wedSwitch}
                  />
                </Col>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Settings;
