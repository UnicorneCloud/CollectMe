const React = require("react-native");
const { Dimensions, Platform } = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  bgHead: {
    backgroundColor: primary,
    flex: 1
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  channelBtn1: {
    borderWidth: 1,
    borderColor: Platform.OS === "android" ? "#ddd" : "rgba(255,255,255,0.5)"
  },
  na: {},
  channelImg: {
    height: deviceHeight / 3 + 10,
    width: deviceWidth / 1 + 2
  },
  ioschannelImgText: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "900",
    padding: 20,
    bottom: -5,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.7)"
  },
  achannelImgText: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "900",
    padding: 20,
    bottom: -5,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.7)"
  }
};
