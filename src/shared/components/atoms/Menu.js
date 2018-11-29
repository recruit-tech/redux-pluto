/* @flow */
import React, { type Node } from "react";
import styled from "styled-components";
import pure from "recompose/pure";

type Props = {
  children: Node,
};

export default pure<Props>(function Menu(props: Props) {
  const { children } = props;

  return <MenuItems>{children}</MenuItems>;
});

const MenuItems = styled.div`
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`;
