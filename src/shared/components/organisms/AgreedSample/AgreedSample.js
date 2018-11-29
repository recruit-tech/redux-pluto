/* @flow */
import React from "react";
import pure from "recompose/pure";

type Props = {
  text: string,
};

export default pure<Props>(function AgreedSample(props: Props) {
  const { text } = props;
  return <div>{text}</div>;
});
