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

import { getUpcomingCollectDates } from '../../utils/model'


class Collectes extends Component {
  render() {
    const { navigation, allCollectSchedules: { data: collectSchedules } } = this.props

    let nextCollects = []

    for (var scheduleType in collectSchedules) {
      const schedule = collectSchedules[scheduleType]

      const test = getUpcomingCollectDates(schedule, 2 / schedule.period).map(upcomingDate => {
        return {
          "collectType": scheduleType,
          "collectPeriod": schedule.period,
          "collectDate": upcomingDate
        }
      })

      nextCollects = nextCollects.concat(test)
    }

    nextCollects.sort((a, b) => a.collectDate - b.collectDate)
    console.log("Next Collects", nextCollects);

    const collectIcons = {
      "garbage":
        <Icon
          name="ios-trash"
          style={{ color: "#999", marginLeft: 2 }} />,
      "recyclage":
        <FontAwesome
          name="recycle"
          style={styles.timelineIcon} />,
      "green residues":
        <Icon
          name="ios-leaf"
          style={{ color: "#999", marginLeft: 2 }} />,
    }
    const collectTitles = {
      "garbage": "Collectes des déchets",
      "recyclage": "Collectes du recyclage",
      "green residues": "Collectes de résidus verts"
    }

    return (
      <Container style={styles.bg}>
        <CustomHeader hasTabs={true} navigation={navigation} />
        <View style={styles.overviewHeaderContainer}>
          <Text style={styles.overviewHeader}>Prévision 14 jours</Text>
          <Text note style={styles.overviewHead}>{`${dayjs().format('D MMMM YYYY')} - ${dayjs().add(14, 'day').format('D MMMM YYYY')}`}</Text>
        </View>

        <Content showsVerticalScrollIndicator={false}>

          {nextCollects.map((collect, i) =>
            <View key={i}>
              <View style={styles.timelineView}>
                <View style={styles.timelineContent}>
                  <Text />
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Grid>
                  <Col style={{ flexDirection: "row" }}>
                    {
                      collectIcons[collect.collectType]
                    }
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={styles.timelineContentHeading}>
                        {collectTitles[collect.collectType]}
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
