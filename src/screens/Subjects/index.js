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

const headerLogo = require("../../../assets/header-logo.png");

class Subjects extends Component {
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
                <Text>Zéro Déchet</Text>
              </TabHeading>
            }
          >
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Compost</Text>
              </TabHeading>
            }
          >
            <TabTwo navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Subjects;
