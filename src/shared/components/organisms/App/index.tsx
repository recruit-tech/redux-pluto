import React, { ReactNode } from "react";
import pure from "recompose/pure";

type Props = {
  children: ReactNode,
};

export default pure(function App(props: Props) {
  const { children } = props;

  return <div>{children}</div>;
});
