/* @flow */
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import { siteSections } from "../../../redux/analytics/utils";

type Props = {};

export default compose(
  sendAnalytics<*>({
    ...siteSections("error", "error"),
  }),
  shouldUpdate(() => false),
)(function Error(props: Props) {
  return <div>Error!</div>;
});
