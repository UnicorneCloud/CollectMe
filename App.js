import React from "react";
import Setup from "./src/boot/setup";

export default class App extends React.Component {
  render() {
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
    return <Setup />;
  }
}
