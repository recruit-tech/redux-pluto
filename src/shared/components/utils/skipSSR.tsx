import React, { Component } from "react";

const SHOW_TIMEOUT = 10;

// skipSSR is a Higher Order Component to skip Server Side Rendering.
// skipSSR(<div> foo bar baz </div>)
const skipSSR = (AlternativeComponent = <div />) => ComposedComponent =>
  class SkipSSR extends Component<{}, { show: boolean }> {
    timeout: number;
    constructor(props, context) {
      super(props, context);
      this.state = {
        show: false,
      };
      this.onShow = this.onShow.bind(this);
    }

    componentDidMount() {
      if (!this.state.show) {
        this.timeout = setTimeout(this.onShow, SHOW_TIMEOUT) as any;
      }
    }

    componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }

    /* eslint-disable react/no-set-state */
    onShow() {
      this.setState({ show: true });
    }
    /* eslint-enable react/no-set-state */

    render() {
      if (this.state.show) {
        return <ComposedComponent {...this.props} />;
      }
      return AlternativeComponent;
    }
  };

export default skipSSR;
