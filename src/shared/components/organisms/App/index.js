/* @flow */
import React, { type Node } from "react";
import pure from "recompose/pure";

type Props = {|
  children: Node
|};

export default pure(function App(props: Props) {
  const { children } = props;

  return <div>{children}</div>;
});
