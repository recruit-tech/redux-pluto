/* @flow */
import React from "react";
import { connect } from "react-redux";
import { compose, shouldUpdate } from "recompose";
import { sendAnalytics, sendEvent } from "react-redux-analytics";
import { siteSections, onAsyncLoaderLoaded } from "shared/redux/analytics/utils";
import { FOO_EVENT_VARIABLE, EVENTS } from "shared/redux/analytics/variableNames";
import bindActionToPropFunctions from "shared/components/utils/bindActionToPropFunctions";

export default compose(
  connect(
    (state, props) => ({}),
    () => ({
      onClickMe: fooVal => () => {
        // This is a dummy event handler
        // to show how to send event using react-redux-analytics.
      }
    }),
  ),
  bindActionToPropFunctions({
    onClickMe: ([fooVal], props, state) => () =>
      sendEvent(
        {
          [EVENTS]: ["event10"],
          [FOO_EVENT_VARIABLE]: fooVal
        },
        []
      )
  }),
  sendAnalytics({
    ...siteSections("foo", "top"),
    onDataReady: onAsyncLoaderLoaded
  }),
  shouldUpdate(() => false)
)(function Foo(props) {
  const { onClickMe } = props;

  return (
    <div>
      Foo!<button onClick={onClickMe("fooooo")}>Click me!</button>
    </div>
  );
});
