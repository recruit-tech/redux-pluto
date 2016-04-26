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
    console.log('componentDidMount', this.props.location.pathname);
    this.updateScrollPosition();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.props.location.pathname);
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
      console.log('set scroll position to', x, y);
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
