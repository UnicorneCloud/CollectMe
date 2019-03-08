// @flow
import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Tabs,
  Tab,
  Text,
  TabHeading
} from "native-base";

import styles from "./styles";

import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";

const headerLogo = require("../../../assets/header-logo.png");

class Channels extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
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
        <Tabs style={{ backgroundColor: "#fff" }}>
          <Tab
            heading={
              <TabHeading>
                <Text>Following</Text>
              </TabHeading>
            }
          >
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Popular</Text>
              </TabHeading>
            }
          >
            <TabTwo navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Explore</Text>
              </TabHeading>
            }
          >
            <TabThree navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Channels;
