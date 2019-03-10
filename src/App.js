// @flow
import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Root } from "native-base";
import Tips from "./screens/Tips/";
import Story from "./screens/Story";
import Home from "./screens/Home/";
import Subjects from "./screens/Subjects";
import Sidebar from "./screens/Sidebar";
import Calendar from "./screens/Calendar/";
import Collectes from "./screens/Collectes";
import Settings from "./screens/Settings";
import Ecocentre from './screens/Ecocenter';
import MapScreen from './screens/Map'

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Subjects: { screen: Subjects },
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
