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


class Walkthrough extends Component {

  componentDidMount() {
    this.props.fetchData(datas)
  }

  render() {
    const tips = this.props.tips

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
                        Fermer
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
