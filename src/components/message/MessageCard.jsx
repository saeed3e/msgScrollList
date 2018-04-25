import React, { PureComponent } from "react";
import { timeago } from "./../../lib/timeago/index.js";
import { config } from "./../../config/config.js";
export class MessageCard extends PureComponent {
  render() {
    let {
      id,
      imgsrc,
      name,
      time,
      index,
      message,
      style
    } = this.props;

    let timeage = timeago().ago(new Date(time).toUTCString());

    /**
     * Since image not accessible from 
     */
    return (
      <div className="swipeableCard" index={index} style={style} >
        <div className="card-panel">
          <header>
            <img src={config.baseUrl+imgsrc} width="40" height="40" />
            <div>
              <div className="name">{name}{index}</div>
              <span className="time">{timeage}</span>
            </div>
          </header>
          <div className="msg block-with-text">{message}</div>
        </div>
      </div>
    );
  }
}
