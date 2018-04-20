/* @flow */
import React from "react";
import { compose, shouldUpdate } from "recompose";

export default compose(
  shouldUpdate(() => false)
)(function Home(props) {
  return <div>Home!</div>;
});
