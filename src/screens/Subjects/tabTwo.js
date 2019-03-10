// @flow
import React, {Component} from "react";
import {ImageBackground, TouchableOpacity, Platform} from "react-native";
import { connect } from "react-redux";

import {Content, Text, View, Icon} from "native-base";
import {Grid, Col, Row} from "react-native-easy-grid";

import { itemsFetchData } from "../Home/actions";

import styles from "./styles";

class TabOne extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const navigation = this.props.navigation;
    const items = this.props.items.filter(item => item.category === 'COMPOST')
    return (
      <Content showsVerticalScrollIndicator={false}>
        <View>
          <Grid>
            {items.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                  <TouchableOpacity onPress={() => navigation.navigate("Story", {id: item.id})}>
                      <ImageBackground
                        source={{uri: item.imageUri}}
                        style={styles.channelImg} >
                        <View style={styles.swiperTextContent}>
                              <Text numberOfLines={2} style={styles.newsPosterHeader} >
                                {item.headline}
                              </Text>
                              <Grid style={styles.swiperContentBox}>
                                <Col style={{ flexDirection: "row" }}>
                                  <Text style={styles.newsPosterLink}>
                                    {item.link}
                                  </Text>
                                  <Icon name="ios-time-outline" style={styles.timePosterIcon} />
                                  <Text style={styles.newsPosterLink}>{item.time}</Text>
                                </Col>
                              </Grid>
                            </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </Col>
                </Row>)})}
          </Grid>
        </View>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(TabOne);
