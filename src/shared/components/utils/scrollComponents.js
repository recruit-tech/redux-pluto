/* eslint-disable react/no-multi-comp, react/no-find-dom-node */
import React, { Component } from "react";
import { throttle } from "lodash/fp";
import ReactDOM from "react-dom";

export const showOnScroll = ComposedComponent =>
  class ShowOnScroll extends Component {
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
      const headerBottom = document
        .querySelector("header")
        .getBoundingClientRect().bottom;
      const shown = this.isShown(
        el.top,
        el.bottom,
        headerBottom,
        height,
        this.heightRatio,
      );
      if (shown && this.props.onShow) {
        this.props.onShow(element);
      }

      const isInWindow = this.isInWindow(
        el.top,
        el.bottom,
        headerBottom,
        height,
        this.heightRatio,
      );
      if (isInWindow && this.props.onInnerWindow) {
        this.props.onInnerWindow(element);
      }
    }

    isShown(elTop, elBottom, headerBottom, windowHeight, heightRatio) {
      const isTopShown = elTop > headerBottom && elTop < windowHeight;
      const isBottomShown = elBottom > headerBottom && elBottom < windowHeight;
      const isInWindow = this.isInWindow(
        elTop,
        elBottom,
        headerBottom,
        windowHeight,
        heightRatio,
      );
      return isTopShown || isBottomShown || isInWindow;
    }

    isInWindow(elTop, elBottom, headerBottom, windowHeight, heightRatio) {
      const isInWindow =
        elTop < headerBottom && windowHeight * heightRatio < elBottom;
      return isInWindow;
    }

    attachScrollListener() {
      window.addEventListener("scroll", this.throttleScrollListener);
      window.addEventListener("resize", this.throttleScrollListener);
    }

    detachScrollListener() {
      window.removeEventListener("scroll", this.throttleScrollListener);
      window.removeEventListener("resize", this.throttleScrollListener);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export const adjustScroll = ComposedComponent =>
  class AdjustScroll extends Component {
    componentDidMount() {
      this.props.shouldAdjustScroll && this.adjustScrollPosition();
    }

    adjustScrollPosition() {
      const element = ReactDOM.findDOMNode(this);
      const el = element.getBoundingClientRect();
      const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset ||
        window.scrollY;
      // FIXME: 即座に scrollTo() を呼び出してもスクロールが機能しないため遅延させている
      setTimeout(() => window.scrollTo(0, scrollTop + el.height), 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export const forceScroll = ComposedComponent =>
  class ForceScroll extends Component {
    componentDidMount() {
      const { x, y } = this.props.forceScrollTo;
      // FIXME: 即座に scrollTo() を呼び出してもスクロールが機能しないため遅延させている
      typeof x === "number" &&
        typeof y === "number" &&
        setTimeout(() => window.scrollTo(x, y), 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
