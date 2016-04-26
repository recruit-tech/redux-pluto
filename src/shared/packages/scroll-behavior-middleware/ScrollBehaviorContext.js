import React, { Component, PropTypes } from 'react';
import { getScrollPosition, resetScrollPosition } from './scrollPosition';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';

export default class ScrollBehaviorContext extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.updateScrollPositionHandle = null;
  }

  componentDidMount() {
    this.updateScrollPosition();
  }

  componentDidUpdate() {
    this.updateScrollPosition();
  }

  updateScrollPosition() {
    if (!this.updateScrollPositionHandle) {
      requestAnimationFrame.cancel(this.updateScrollPositionHandle);
    }

    this.updateScrollPositionHandle = requestAnimationFrame(() => {
      this.updateScrollPositionHandle = null;

      const scrollPosition = getScrollPosition();
      if (!scrollPosition) {
        return;
      }

      const { x, y } = scrollPosition;
      window.scrollTo(x, y);

      this.updateScrollPositionHandle = requestAnimationFrame(() => {
        this.updateScrollPositionHandle = null;
        resetScrollPosition();
      });
    });
  }

  render() {
    return this.props.children;
  }
}
