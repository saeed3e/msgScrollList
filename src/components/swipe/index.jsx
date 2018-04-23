import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// this tiny library is responsible for adding swipe animation on cards(DOM nodes), 
// Reference : https://github.com/GoogleChromeLabs/ui-element-samples/tree/gh-pages/swipeable-cards
import { Cards } from "./swipe.js";

export class Swipe extends PureComponent {
  componentDidMount() {
    let {
      onCardDismissed, // when card is dismissed or disappear from current view port then this callback function will invoke
      targetNodeClass, // Swipe functionality will be enabled only on target(having the ) nodes 
      parentNodeSelector // It is a parent node selector for event delegation
    } = this.props;

    /**
     * Init Swipe functionality on passed target DOM nodes
     */
    new Cards({
      onCardDismissed,
      targetNodeClass,
      parentNodeSelector
    });
  }
  render() {
    return this.props.children
  }
}

/**
 * Type check for Swipe component props
 */
Swipe.propTypes = {
  onCardDismissed: PropTypes.func.isRequired,
  targetNodeClass: PropTypes.string.isRequired,
  parentNodeSelector: PropTypes.string
};
