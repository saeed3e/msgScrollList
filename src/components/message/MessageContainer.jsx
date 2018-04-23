import React, { PureComponent } from "react";

/**
 * Import Shimmer to show loading state of messages
 */
import { Shimmer } from "./../shimmer/Shimmer.jsx";

/**
 * import List,AutoSizer and InfiniteLoader from react virtualized npm module.
 * List: This component renders a windowed list (rows) of elements. It uses a Grid internally to render the rows and all props are relayed to that inner Grid.
 * AutoSizer: High-order component that automatically adjusts the width and height of a single child.
 * InfiniteLoader: A component that manages just-in-time fetching of data as a user scrolls up or down in a list.
 */
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";

/**
 * Create a React Swipe component to enable swipe functionality on card messages
 */
import { Swipe } from "./../swipe/index.jsx";

/**
 * MessageCard component define the layout of message card
 */
import { MessageCard } from "./MessageCard.jsx";

/**
 * Common configuration file contain all the API paths used in the application
 */
import { config } from "./../../config/config.js";

export class MessageContainer extends PureComponent {
  constructor() {
    super();
    /**
     * contain next message token reference for lazy loading of messages
     */
    this.nextToken = "";
    /**
     * State object contain msgList array to store messages
     */
    this.state = {
      msgList: []
    };
  }

  /**
   * This function responsible to get data from server and update the MessageContainer
   * component's internal state by using 'this.setState' function
   */
  getDataFromServer = () => {
    // fetching data using fetch API
    return fetch(
      `${config.baseUrl + "/messages"}?limit=20&pageToken=${this.nextToken}`
    )
      .then(response => response.json())
      .then(data => {
        this.nextToken = data.pageToken;

        /**
         * calculate the height of message's content, to set dynamic height on each card
         */
        var test = document.createElement("div");
        test.classList.add("block-with-text");
        test.style.width = "288px";
        test.style.position = "absolute";
        test.style.transform = "translateX(-2000px)";
        document.body.appendChild(test);

        // Adding new height key in message object based on the height of the content
        data.messages.map((value, index) => {
          test.innerText = value.content;
          value.height = test.clientHeight + 8;
          return value;
        });
        test.remove();

        /**
         * Update internal state of the component with new messages
         */
        this.setState({
          msgList: [...this.state.msgList, ...data.messages]
        });
      });
  };

  /**
   * Responsible for rendering a single row, given its index. 
   */
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style // Style object to be applied to row (to position it)
  }) => {
    let view = null;

    // Created a modified object as per need
    let modifiedStyle = {
      ...style,
      width: parseInt(style.width) - 8.33 + "%",
      left: 4.17 + "%",
      top: style.top + 15
    };

    
    if (this.state.msgList[index]) {
      // if message exist at give index then draw the message card

      // use object destructoring to extract values from message object.
      let { author, content, updated, id } = this.state.msgList[index];

      view = (
        <MessageCard
          style={modifiedStyle}
          key={"isml-" + index}
          index={index}
          imgsrc={author.photoUrl}
          name={author.name}
          time={updated}
          id={id}
          message={content}
          onCardDismissed={this.onCardDismissed}
        />
      );
    } else {
      /**
       * Only show when user scroll the page or show the loading state of new messages
       */
      if (this.state.msgList.length) {
        view = <Shimmer key={"shim-" + index} style={modifiedStyle} />;
      }
    }
    return view;
  };

  /**
   * Function responsible for tracking the loaded state of each row.
   */
  isRowLoaded = ({ index }) => {
    return !!this.state.msgList[index];
  };

  /**
   * Update the internal state of the component with deleted message from msgList array
   */
  onCardDismissed = index => {
    const finalArray = [
      ...this.state.msgList.slice(0, index),
      ...this.state.msgList.slice(index + 1, this.state.msgList.length)
    ];
    // set the internal state with deleted message
    this.setState({
      msgList: finalArray
    });
  };

  /**
   * Callback used to render placeholder content when rowCount is 0
   */
  noRowsRenderer = () => {
    return (
      <div className="initialShimmer">
        <Shimmer count={4} />
      </div>
    );
  };

  render() {
    let { msgList } = this.state;
    let listSize = !msgList.length ? 1 : msgList.length + 1;

    let headerHeight = 42;
    let cardTopBottomPadding = 22 * 2;
    let contentTopMargin = 12;

    return (
      <div className="msgCont">
        <Swipe
          onCardDismissed={this.onCardDismissed}
          parentNodeSelector={".msgCont"}
          targetNodeClass={"swipeableCard"}>

          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={() => this.getDataFromServer()}
            rowCount={listSize}>
            {({ onRowsRendered, registerChild }) => (

              <AutoSizer className="card-container">
                {({ height, width }) => (

                  <List
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    width={width}
                    height={height}
                    rowCount={listSize}
                    rowHeight={({ index }) => {
                      const rowHeight = msgList[index]
                        ? msgList[index].height +
                          headerHeight +
                          cardTopBottomPadding +
                          contentTopMargin
                        : 175;
                      return rowHeight;
                    }}
                    rowRenderer={this.rowRenderer}
                    noRowsRenderer={this.noRowsRenderer}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </Swipe>
      </div>
    );
  }
}
