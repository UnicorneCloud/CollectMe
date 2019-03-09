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

const dechetsJson = require('../../../data/dechets.json');

class Collectes extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <Container style={styles.bg}>
        <CustomHeader hasTabs={true} navigation={navigation} />
        <View style={styles.overviewHeaderContainer}>
          <Text style={styles.overviewHeader}>{dayjs().format('dddd')}</Text>
          <Text note style={styles.overviewHead}>{dayjs().format('DD MMMM YYYY')}</Text>
        </View>

        <Content showsVerticalScrollIndicator={false}>

          <View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Grid>
                <Col style={{ flexDirection: "row" }}>
                  <Icon
                    name="ios-trash"
                    style={{ color: "#999", marginLeft: 2 }}
                  />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={styles.timelineContentHeading}>
                      Collectes des déchets
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.newsTypeView}>
                    <Icon name="ios-time-outline" style={styles.timeIcon} />
                    <Text style={styles.time}>{dayjs().format('D MMM')}</Text>
                  </View>
                </Col>
              </Grid>
            </View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTextHeader}>
                  Toutes les semaines
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Grid>
                <Col style={{ flexDirection: "row" }}>
                  <FontAwesome
                    name="recycle"
                    style={styles.timelineIcon}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.timelineContentHeading}>Collecte du recyclage</Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.newsTypeView}>
                    <Icon name="ios-time-outline" style={styles.timeIcon} />
                    <Text style={styles.time}>{dayjs().format('D MMM')}</Text>
                  </View>
                </Col>
              </Grid>
            </View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTextHeader}>
                  Toutes les 2 semaines
                </Text>
              </View>
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}

export default connect()(Collectes);
