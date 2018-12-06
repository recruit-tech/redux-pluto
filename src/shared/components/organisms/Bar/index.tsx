import React from "react";
import { compose, shouldUpdate } from "recompose";
import { range } from "lodash";
import { sendAnalytics } from "react-redux-analytics";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";

const array = range(0, 500);

type Props = { onDataReady: boolean };
export default compose<Props, {}>(
  sendAnalytics({
    ...siteSections("bar", "top"),
    onDataReady: onAsyncLoaderLoaded,
  }),
  shouldUpdate(() => false),
)(function Bar(props: Props) {
  return (
    <main>
      {array.map(elm => (
        <div key={elm}>
          Bar![
          {elm}]
        </div>
      ))}
    </main>
  );
});
