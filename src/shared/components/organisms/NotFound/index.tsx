import React from "react";
import { compose, shouldUpdate } from "recompose";

export default compose<{}, {}>(shouldUpdate(() => false))(function NotFound(
  props,
) {
  return <div>NotFound!</div>;
});
