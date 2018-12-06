
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";

export default compose(
  sendAnalytics({
    ...siteSections("home", "top"),
    onDataReady: onAsyncLoaderLoaded,
  }),
  shouldUpdate(() => false),
)(function Home(props) {
  return <div>Home!</div>;
});
