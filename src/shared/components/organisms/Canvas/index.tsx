import React from "react";
import { compose, shouldUpdate } from "recompose";

export default compose(
  shouldUpdate(() => false),
)(function Canvas(props) {
  return <div>Draw</div>;
});
