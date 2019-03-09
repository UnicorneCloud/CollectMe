// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, Linking } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { Calendar as MonthCalendar } from "react-native-calendars";
import dayjs from 'dayjs';

import styles from "./styles";
import events from "./data.json"

const headerLogo = require("../../../assets/header-logo.png");
type Props = {
  navigation: () => void,
  day: string
};
class Calendar extends Component {
  state: {
    date: Object,
    selected: string
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      date: new Date(),
      selected: new dayjs().format("YYYY-MM-DD")
    };
  }

  onDateChange(date: Object) {
    this.setState({ date });
  }
  onDayPress(day: any) {
    console.log(day.dateString);
    this.setState({
      selected: day.dateString
    });
  }



  render() {
    console.log(events)

    let eventDates = {}
    events.forEach(d => {
      eventDates = { ...eventDates, ...d.dates }
    });

    events.sort((a, b) => new Date(Object.keys(a.dates)[0]) - new Date(Object.keys(b.dates)[0]))

    const navigation = this.props.navigation;

    return (
      <Container>
        <Header>
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

        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.bg}>
            <MonthCalendar
              onDayPress={e => this.onDayPress(e)}
              disableMonthChange={true}
              markedDates={{
                ...eventDates,
                // Today
                [this.state.selected]: { color: '#01cca1', textColor: '#ffffff', startingDay: true, endingDay: true },
              }}
              markingType={'period'}
              theme={{
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#01cca1",
                selectedDayBackgroundColor: "#01cca1",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#01cca1",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "#01cca1",
                monthTextColor: "#000"
              }}
            />
          </View>

          <View style={{ backgroundColor: "#fff" }}>

            {events.map(event =>
              <TouchableOpacity
                key={event.id}
                style={{ flexDirection: "row" }}
                onPress={() => Linking.openURL(event.url)}
              >
                <Image
                  source={{ uri: event.imageUri }}
                  style={styles.newsImage}
                  resizeMode="contain"
                />
                <View style={styles.newsContent}>
                  <Text numberOfLines={2} style={styles.newsHeader}>
                    {event.headline}
                  </Text>
                  <Grid style={{ marginTop: 25 }}>
                    <Col>
                      <Text style={styles.newsLink}>{event.time}</Text>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        style={styles.newsTypeView}
                      >
                        <Text style={styles.newsTypeText}>{event.category}</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
            )}


          </View>
        </Content>
      </Container>
    );
  }
}

export default Calendar;
