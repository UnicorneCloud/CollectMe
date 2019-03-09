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
import { Notifications, Constants } from 'expo'
import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";

import styles from "./styles";
import { setAllCollectSchedules } from '../../actions'
import { itemsFetchData, itemsHeaderFetchData } from "./actions"
import { getCollectScheduleData } from '../../utils/model'
import { askLocationPermission } from '../../actions/location';

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");

class Home extends Component {
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.props.askLocationPermission();
    }
    this.props.fetchData()
    this.props.fetchHeaderData()
  }
  
  async resetScheduledNotifications(collectSchedules){
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Promise.all(Object.keys(collectSchedules).map(collectType => {
      return Notifications.scheduleLocalNotificationAsync({
        title: collectType.toString(),
        body: collectSchedules[collectType].toString()
      },
      {
        time: (new Date()).getTime() + 1000
      })
    }))
  }
  
  async componentDidUpdate(prevProps, prevState){
    const { location } = this.props
    if(prevProps.location !== location){
      const collectSchedules = getCollectScheduleData(location)
      this.props.setAllCollectSchedules(collectSchedules)
      await this.resetScheduledNotifications(collectSchedules)
    }
  }
  
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => this.props.navigation.navigate("Story")}
      >
        <View style={styles.newsContent}>
          <Text numberOfLines={2} style={styles.newsHeader}>
            {item.headline}
          </Text>
          <Grid style={styles.swiperContentBox}>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.newsLink}>
                {item.link}
              </Text>
              <Icon name="ios-time-outline" style={styles.timeIcon} />
              <Text style={styles.newsLink}>
                {item.time}
              </Text>
            </Col>
            <Col>
              <TouchableOpacity
                style={styles.newsTypeView}
                onPress={() => this.props.navigation.navigate("Channel")}
              >
                <Text style={styles.newsTypeText}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </TouchableOpacity>
    );
  };
  render() {

    const itemsHeader = this.props.itemsHeader || []

    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon active name="menu" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right />
          </Header>
          <Content showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff" }} >
            <View>
              <View>
                <Carousel
                  width={deviceWidth}
                  height={330}
                  indicatorAtBottom
                  indicatorSize={Platform.OS === "android" ? 15 : 10}
                  indicatorColor="#FFF"
                  indicatorOffset={10}
                  animate={false} >
                  {itemsHeader.map((item, index) => {
                    return (
                      <RNView key={index}>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => this.props.navigation.navigate("Story",{id: item.id})}
                          style={styles.slide} >
                          <ImageBackground
                            style={styles.newsPoster}
                            source={{uri:item.imageUri}} >
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
                                <Col>
                                  <TouchableOpacity style={styles.newsPosterTypeView} >
                                    <Text
                                      style={styles.newsPosterTypeText}
                                      onPress={() => this.props.navigation.navigate("Channel",{category: item.category})} >
                                      {item.category}
                                    </Text>
                                  </TouchableOpacity>
                                </Col>
                              </Grid>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </RNView>
                    )
                  })}
                </Carousel>
              </View>
            </View>

            <FlatList
              data={this.props.items}
              renderItem={this._renderItem}
              keyExtractor={item => item.id}
            />
          </Content>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
    fetchHeaderData: url => dispatch(itemsHeaderFetchData(url)),
    askLocationPermission: () => dispatch(askLocationPermission()),
    setAllCollectSchedules: (collectSchedules) => dispatch(setAllCollectSchedules(collectSchedules))
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  itemsHeader: state.homeReducer.itemsHeader,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading,
  location: state.locationReducer.location,
});
export default connect(mapStateToProps, bindAction)(Home);
