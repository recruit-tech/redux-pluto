/* eslint-disable react/no-multi-comp, react/no-find-dom-node */
import React, { Component } from 'react';
import throttle from 'lodash/fp/throttle';
import ReactDOM from 'react-dom';

export const showOnScroll = (ComposedComponent) => class ShowOnScroll extends Component {
  componentDidMount() {
    this.throttleScrollListener = throttle(300, () => this.scrollListener());
    this.heightRatio = this.props.heightRatio || 1;
    this.isUnmounting = false;
    setTimeout(() => this.attachScrollListener(), 300);
  }

  componentWillUnmount() {
    this.isUnmounting = true;
    this.detachScrollListener();
  }

  scrollListener() {
    if (this.isUnmounting) {
      return;
    }

    const element = ReactDOM.findDOMNode(this);
    const el = element.getBoundingClientRect();
    const height = window.innerHeight;
    const shown = this.isShown(el.top, el.bottom, height, this.heightRatio);
    if (shown && this.props.onShow) {
      this.props.onShow(element);
    }

    const isInWindow = this.isInWindow(el.top, el.bottom, height, this.heightRatio);
    if (isInWindow && this.props.onInnerWindow) {
      this.props.onInnerWindow(element);
    }
  }

  isShown(elTop, elBottom, windowHeight, heightRatio) {
    const isTopShown = (elTop > 0 && elTop < windowHeight);
    const isBottomShown = (elBottom > 0 && elBottom < windowHeight);
    const isInWindow = this.isInWindow(elTop, elBottom, windowHeight, heightRatio);
    return isTopShown || isBottomShown || isInWindow;
  }

  isInWindow(elTop, elBottom, windowHeight, heightRatio) {
    const isInWindow = (elTop < 0 && windowHeight * heightRatio < elBottom);
    return isInWindow;
  }

  attachScrollListener() {
    window.addEventListener('scroll', this.throttleScrollListener);
    window.addEventListener('resize', this.throttleScrollListener);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.throttleScrollListener);
    window.removeEventListener('resize', this.throttleScrollListener);
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

export const adjustScroll = (ComposedComponent) => class AdjustScroll extends Component {
  componentDidMount() {
    this.props.shouldAdjustScroll && this.adjustScrollPosition();
  }

  adjustScrollPosition() {
    const element = ReactDOM.findDOMNode(this);
    const el = element.getBoundingClientRect();
    const scrollTop =
      document.documentElement.scrollTop
      || document.body.scrollTop
      || window.pageYOffset
      || window.scrollY;
    window.scrollTo(0, scrollTop + el.height);
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

export const forceScroll = (ComposedComponent) => class ForceScroll extends Component {
  componentDidMount() {
    const { x, y } = this.props.forceScrollTo;
    typeof x === 'number' && typeof y === 'number' && window.scrollTo(x, y);
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};
