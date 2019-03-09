// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Content, Text, Icon, View } from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import CustomHeader from "../../components/CustomHeader";

import styles from "./styles";

import dayjs from 'dayjs';

import 'dayjs/locale/fr'
import FontAwesome from "@expo/vector-icons/FontAwesome";
dayjs.locale('fr') // use French locale globally


class Collectes extends Component {
  render() {
    const { navigation, allCollectSchedules: { data: collectSchedules } } = this.props
    console.log(collectSchedules)


    const getNext14DaysCollect = (schedule) => {
      const nextCollects = [];

      const currentDay = dayjs().day();
      console.log("currentDay", currentDay)

      const targetDay = 5;

      let nextCollect = dayjs().set('day', targetDay)

      console.log("nextCollect-before", nextCollect.format("YYYY-MM-DD"))

      if (targetDay < currentDay) {
        nextCollect = nextCollect.add(1, 'week')
      }
      nextCollects.push(nextCollect);

      if (schedule.period === 1) {

      }

      return nextCollects;
    }

    const nextCollects = [
      {
        "collectType": "Garbage",
        "collectPeriod": 1,
        "collectDate": dayjs()
      },
      {
        "collectType": "Garbage",
        "collectPeriod": 1,
        "collectDate": dayjs()
      },
      {
        "collectType": "Recycling",
        "collectPeriod": 2,
        "collectDate": dayjs()
      }
    ];

    // for (var scheduleType in collectSchedules) {
    //   console.log("scheduleType", scheduleType)

    //   const schedule = collectSchedules[scheduleType]
    //   console.log("schedule", schedule)

    //   const nextCollectForSpecificType = getNext14DaysCollect(schedule);

    //   console.log("==========================")
    //   console.log("nextCollectForSpecificType", nextCollectForSpecificType)
    // }


    return (
      <Container style={styles.bg}>
        <CustomHeader hasTabs={true} navigation={navigation} />
        <View style={styles.overviewHeaderContainer}>
          <Text style={styles.overviewHeader}>{dayjs().format('dddd')}</Text>
          <Text note style={styles.overviewHead}>{dayjs().format('DD MMMM YYYY')}</Text>
        </View>

        <Content showsVerticalScrollIndicator={false}>

          {nextCollects.map(collect =>
            <View>
              <View style={styles.timelineView}>
                <View style={styles.timelineContent}>
                  <Text />
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Grid>
                  <Col style={{ flexDirection: "row" }}>
                    {
                      collect.collectType == "Garbage" ?
                        <Icon
                          name="ios-trash"
                          style={{ color: "#999", marginLeft: 2 }}
                        /> :
                        <FontAwesome
                          name="recycle"
                          style={styles.timelineIcon}
                        />
                    }
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={styles.timelineContentHeading}>
                        {`Collectes ${collect.collectType == "Garbage" ? "des déchets" : " du recyclage"}`}
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View style={styles.newsTypeView}>
                      <Icon name="ios-time-outline" style={styles.timeIcon} />
                      <Text style={styles.time}>{collect.collectDate.format('D MMM')}</Text>
                    </View>
                  </Col>
                </Grid>
              </View>
              <View style={styles.timelineView}>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTextHeader}>
                    {`Toutes les ${collect.collectPeriod > 1 ? `${collect.collectPeriod} ` : ""}semaines`}
                  </Text>
                </View>
              </View>
            </View>
          )}

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ collectSchedule }) => {
  const { allCollectSchedules } = collectSchedule
  return { allCollectSchedules }
}

export default connect(mapStateToProps)(Collectes);
