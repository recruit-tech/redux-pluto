/* @flow */
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import { siteSections } from "../../../redux/analytics/utils";

export default compose(
  shouldUpdate<void, void>(() => false),
  sendAnalytics({
    ...siteSections("error", "notfound"),
  }),
)(function NotFound(props) {
  return <div>NotFound!</div>;
});
