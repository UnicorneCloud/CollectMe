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
import { Permissions, Notifications, Constants } from 'expo'
import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";

import styles from "./styles";
import { setAllCollectSchedules, setAllGeometries } from '../../actions'
import { itemsFetchData, itemsHeaderFetchData } from "./actions"
import { getCollectScheduleData, getUpcomingCollectDates, getAllGeometriesMock } from '../../utils/model'

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");

class Home extends Component {
  async componentDidMount() {
    this.props.fetchData()
    this.props.fetchHeaderData()
    
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
    if (Constants.isDevice && result.status === 'granted') {
      console.log("Notification permissions granted.")
    }

    const collectSchedules = getCollectScheduleData()
    this.props.setAllCollectSchedules(collectSchedules)
    await this.resetScheduledNotifications(collectSchedules)
  }
  
  async resetScheduledNotifications(collectSchedules){
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleLocalNotificationAsync({
      title: 'Déchets',
      body: 'La collecte de déchets est demain matin.'
    },
    {
      time: (new Date()).getTime() + 1000,
    })

    await Promise.all(Object.keys(collectSchedules)
      .map(collectType => {
        console.log('sad')
        const collectSchedule = collectSchedules[collectType]
        const dates = getUpcomingCollectDates(collectSchedule, collectSchedule.daysInt.length * collectSchedule.period)
        const promises = dates.map(date => {
          const name = collectType === 'garbage' ? 'déchets' : 'garbage'
          return [
            Notifications.scheduleLocalNotificationAsync({
              title: name.charAt(0).toUpperCase() + name.slice(1),
              body: 'La collecte de ' + name + ' est demain matin.'
            },
            {
              time: date.subtract(1, 'day').set('hour', 18).toDate(),
              repeat: 'month'
            }),
            Notifications.scheduleLocalNotificationAsync({
              title: name.charAt(0).toUpperCase() + name.slice(1),
              body: 'La collecte de ' + name + ' est ce matin.'
            },
            {
              time: date.set('hour', 7).toDate(),
              repeat: 'month'
            })
          ]
        }).flat()
        console.log(promises)
        return promises
      }).flat())
    console.log('consologdonc2')

  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props
    this.props.setAllGeometries(getAllGeometriesMock(location))
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => this.props.navigation.navigate("Story", { id: item.id })}
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
                onPress={() => this.props.navigation.navigate("Story", { id: item.id })} >
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
                          onPress={() => this.props.navigation.navigate("Story", { id: item.id })}
                          style={styles.slide} >
                          <ImageBackground
                            style={styles.newsPoster}
                            source={{ uri: item.imageUri }} >
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
                                      onPress={() => this.props.navigation.navigate("Channel", { category: item.category })} >
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
    setAllCollectSchedules: (collectSchedules) => dispatch(setAllCollectSchedules(collectSchedules)),
    setAllGeometries: (geometries) => dispatch(setAllGeometries(geometries))
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
