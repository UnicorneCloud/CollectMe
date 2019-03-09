// @flow
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  Slider,
  Dimensions,
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
  Right,
  Body,
  View,
  Spinner
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import { itemsFetchData } from "../Home/actions";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;

const headerLogo = require("../../../assets/header-logo.png");

type Props = {
  navigation: () => void
};

class Story extends Component {
  state = {
    animationType: "slideInDown",
    open: false,
    value: 0
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      animationType: "slideInDown",
      open: false,
      value: 0
    };
  }

  modalO() {
    this.setState({ open: true });
  }

  modalX() {
    this.setState({ open: false });
  }

  componentDidMount() {
    this.props.fetchData(datas)
    const itemId = this.props.navigation.getParam('id', '')
  }

  render() {
    let d = Dimensions.get("window");
    const { height, width } = d;

    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      const item = this.props.items[this.props.navigation.getParam('id', '0')]
      return (
        <Container>
          <Header
            style={[
              styles.headerStyle,
              this.state.open ? styles.headerModalStyle : styles.headerStyle
            ]}
          >
            <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon active name="arrow-back" style={styles.headerIcons} />
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
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={{uri:item.imageUri}}
                  style={styles.newsPoster}
                />
              </View>
              <View style={{ backgroundColor: "#fff" }}>
                <View style={styles.newsContent}>
                  <Grid style={{ paddingBottom: 20 }}>
                    <Col style={{ flexDirection: "row" }}>
                      <TouchableOpacity>
                        <Text style={styles.newsLink}>{item.link}</Text>
                      </TouchableOpacity>
                      <Icon name="ios-time-outline" style={styles.timeIcon} />
                      <Text style={styles.newsLink}>{item.time}</Text>
                    </Col>
                    <Col>
                      <TouchableOpacity style={styles.newsTypeView}>
                        <Text style={styles.newsTypeText}>{item.category}</Text>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                  <Text style={styles.newsHeader}>
                    {item.headline}
                  </Text>
                  <Text style={styles.newsHeader}>
                    {item.content}
                  </Text>
                </View>

              </View>
            </View>
          </Content>
        </Container>
      )
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(Story);
