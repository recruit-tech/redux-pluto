import React, { ReactNode } from "react";
import { pure, compose } from "recompose";
import { showOnScroll } from "../utils/scrollComponents";

type Props = {
  children?: ReactNode | string;
  onShow?: any;
};

export default compose<Props, Props>(
  pure,
  showOnScroll,
)(function SearchMore(props: Props) {
  const { children, onShow } = props;
  return (
    <div onClick={onShow} onKeyDown={onShow}>
      {children}
    </div>
  );
});
