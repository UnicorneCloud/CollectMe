import React, { Component } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import { NavigationActions, StackActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
} from "native-base";
import styles from "./style";

class SideBar extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Home");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-grid-outline" />
              <Text style={styles.linkText}>ARTICLES</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Channels");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-keypad-outline" />
              <Text style={styles.linkText}>SUJETS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Ecocentre");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-trash" />
              <Text style={styles.linkText}>TROUVER UN ÉCOCENTRE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Calendar");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-calendar-outline" />
              <Text style={styles.linkText}>CALENDRIER</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Collectes");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-timer-outline" />
              <Text style={styles.linkText}>COLLECTES</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("MapScreen");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-map" />
              <Text style={styles.linkText}>MAP</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-settings-outline" />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
