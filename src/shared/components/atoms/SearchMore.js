/* @flow */
import React, { type Node } from "react";
import { compose, pure } from "recompose";
import { showOnScroll } from "../utils/scrollComponents";

type Props = {
  children: Node,
  onShow: boolean,
};

export default compose(
  (pure: any),
  showOnScroll,
)(function SearchMore(props: Props) {
  const { children, onShow } = props;
  return (
    <div onClick={onShow} onKeyDown={onShow}>
      {children}
    </div>
  );
});
