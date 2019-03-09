// @flow
import React, { Component } from "react";
import { Platform, Dimensions, StatusBar, View } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import { connect } from "react-redux";

import { tipsFetch } from "../../actions";
import datas from "./data.json"

import styles from "./styles";

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


class Walkthrough extends Component {

  componentDidMount() {
    this.props.fetchData(datas)
  }

  render() {
    const tipsTemp = this.props.tips
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
                    Astuces
                    </Text>
                    <Icon name="md-bulb" style={styles.imageIcons} />
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
