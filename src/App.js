// @flow
import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Root } from "native-base";
import Tips from "./screens/Tips/";
import Comments from "./screens/Comments/";
import Channel from "./screens/Channel";
import Story from "./screens/Story";
import Home from "./screens/Home/";
import Channels from "./screens/Channels";
import Sidebar from "./screens/Sidebar";
import Calendar from "./screens/Calendar/";
import Collectes from "./screens/Collectes";
import Settings from "./screens/Settings";
import Ecocentre from './screens/Ecocenter';
import MapScreen from './screens/Map'

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Channels: { screen: Channels },
    Calendar: { screen: Calendar },
    Collectes: { screen: Collectes },
    Settings: { screen: Settings },
    Ecocentre: {screen: Ecocentre},
    MapScreen: {screen: MapScreen}
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = createStackNavigator(
  {
    Tips: { screen: Tips },
    Story: { screen: Story },
    Comments: { screen: Comments },
    Channel: { screen: Channel },
    Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Tips",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
