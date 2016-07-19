import React, { Proptypes, Component } from 'react';
import { throttle } from 'lodash';
import ReactDOM from 'react-dom';

export const showOnScroll = (ComposedComponent) => class ShowOnScroll extends Component {
  componentDidMount() {
    this._scrollListener = throttle(this.scrollListener.bind(this), 300);
    this.heightRatio = this.props.heightRatio || 1;
    this.isUnmounting = false;
    setTimeout(this.attachScrollListener.bind(this), 300);
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
    const isTopShown = (0 < elTop && elTop < windowHeight);
    const isBottomShown = (0 < elBottom && elBottom < windowHeight);
    const isInWindow = this.isInWindow(elTop, elBottom, windowHeight, heightRatio);
    return isTopShown || isBottomShown || isInWindow;
  }

  isInWindow(elTop, elBottom, windowHeight, heightRatio) {
    const isInWindow = (elTop < 0 && windowHeight * heightRatio < elBottom);
    return isInWindow;
  }

  attachScrollListener() {
    window.addEventListener('scroll', this._scrollListener);
    window.addEventListener('resize', this._scrollListener);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this._scrollListener);
    window.removeEventListener('resize', this._scrollListener);
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
      document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || window.scrollY;
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
