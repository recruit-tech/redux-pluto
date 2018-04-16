/* @flow */
import React, { type Node } from "react";
import { compose, pure } from "recompose";
import { showOnScroll } from "shared/components/utils/scrollComponents";

type Props = {
  children: Node,
  onShow: boolean
};

export default compose(pure, showOnScroll)(function SalonMore(props: Props) {
  const { children, onShow } = props;
  return <div onClick={onShow} onKeyDown={onShow}>{children}</div>;
});
