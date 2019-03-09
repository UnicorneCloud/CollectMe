import React, { Component } from "react";
import { Platform, Dimensions, StatusBar, View } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import { connect } from "react-redux";

import { tipsFetch } from "../../actions";
import { DATA } from "./data"

import styles from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import { Permissions, Notifications } from 'expo'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  console.log('#1')

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iO
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  console.log('#2')

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  console.log('#3')

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  console.log('TOKEN:', token)

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });
}

class Walkthrough extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: DATA,
    };
  }
  
  componentDidMount() {
    registerForPushNotificationsAsync()
  }

  render() {
    const tipsTemp = this.state.tips
    const tips = (tipsTemp.length>0) ? [tipsTemp[getRandomInt(0, tipsTemp.length-1)]] : []

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content>
          <Carousel
            width={deviceWidth}
            height={deviceHeight}
            loop={false}
            indicatorAtBottom
            indicatorOffset={deviceHeight / 15}
            indicatorSize={Platform.OS === "android" ? 15 : 10}
            indicatorColor="#FFF"
            animate={false} >

            {tips.map((tip, index) => {
                return (
                  <View key={index} style={styles.slides}>
                    <Text
                      style={
                        Platform.OS === "android"
                          ? styles.apaginationText
                          : styles.iospaginationText
                      } >
                      <MaterialCommunityIcons name="leaf" size={25} color="#FFF" />
                      <Text style={styles.titleText}> Astuce verte!</Text>
                    </Text>
                    {tip.icon}
                    <Text
                      numberOfLines={2}
                      style={
                        Platform.OS === "android" ? styles.aText : styles.iosText
                      }>
                      {tip.headline}
                    </Text>
                    <Button
                      transparent
                      rounded
                      onPress={() => this.props.navigation.navigate("Drawer")}
                      style={styles.Button} >
                      <Text style={{ color: "#FFF", fontWeight: "600" }}>
                        Continuer
                      </Text>
                    </Button>
                  </View>
                )
              })
            }
          </Carousel>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(tipsFetch(url))
  };
}

const mapStateToProps = state => ({
  tips: state.tipsReducer.tips
});
export default connect(mapStateToProps, bindAction)(Walkthrough)
