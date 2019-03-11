import React from "react";
import { compose, shouldUpdate } from "recompose";

type Props = {};

export default compose<Props, {}>(shouldUpdate(() => false))(function Error(
  props: Props,
) {
  return <div>Error!</div>;
});
