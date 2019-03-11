import React, { ReactNode, memo } from "react";

type Props = {
  children: ReactNode;
};

export default memo(function App(props: Props) {
  const { children } = props;

  return <div>{children}</div>;
});
