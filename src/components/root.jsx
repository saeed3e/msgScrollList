import React, { PureComponent } from "react";
import { Header } from "./header/header.jsx";
import { MessageContainer } from "./message/MessageContainer.jsx";

/**
 * Import project style sass file
 */
import "./../sass/style.scss";

export default class RootComponent extends React.PureComponent {
  render() {
    return [
      /**
       * Header/Navigation component
       */
      <Header key="header" />,
      /**
       * Message container component responsible to display messages
       */
      <MessageContainer key="msgCont" />
    ];
  }
}
