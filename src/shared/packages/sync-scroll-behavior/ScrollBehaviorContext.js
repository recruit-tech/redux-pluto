import React, { Component, PropTypes } from 'react';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import { updateScroll } from './shouldUpdateScroll';

export default class ScrollBehaviorContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.updateScrollPosition();
  }

  componentDidUpdate() {
    this.updateScrollPosition();
  }

  updateScrollPosition() {
    requestAnimationFrame(() => {
      updateScroll();
    });
  }

  render() {
    return this.props.children;
  }
}
