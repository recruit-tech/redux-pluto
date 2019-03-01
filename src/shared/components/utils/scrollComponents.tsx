/* eslint-disable react/no-multi-comp, react/no-find-dom-node */
import React, { Component } from "react";
import { throttle } from "lodash/fp";
import ReactDOM from "react-dom";

export const showOnScroll = (ComposedComponent: React.ComponentType<any>) =>
  class ShowOnScroll extends Component<{
    heightRatio: number | void;
    onShow: Function | void;
    onInnerWindow: Function | void;
  }> {
    throttleScrollListener: any;
    heightRatio: number;
    isUnmounting: boolean;
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

      const element = ReactDOM.findDOMNode(this) as Element;
      const el = element.getBoundingClientRect();
      const height = window.innerHeight;
      const headerBottom = (document.querySelector(
        "header",
      ) as HTMLElement).getBoundingClientRect().bottom;
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

    isShown(
      elTop: number,
      elBottom: number,
      headerBottom: number,
      windowHeight: number,
      heightRatio: number,
    ) {
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

    isInWindow(
      elTop: number,
      elBottom: number,
      headerBottom: number,
      windowHeight: number,
      heightRatio: number,
    ) {
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

export const adjustScroll = (ComposedComponent: React.ComponentType<any>) =>
  class AdjustScroll extends Component<{
    shouldAdjustScroll: Function | void;
  }> {
    componentDidMount() {
      this.props.shouldAdjustScroll && this.adjustScrollPosition();
    }

    adjustScrollPosition() {
      const element = ReactDOM.findDOMNode(this) as Element;
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

export const forceScroll = (ComposedComponent: React.ComponentType<any>) =>
  class ForceScroll extends Component<{
    forceScrollTo: { x: number; y: number };
  }> {
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
