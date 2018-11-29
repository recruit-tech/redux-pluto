/* @flow */
import React, { type Node } from "react";
import styled from "styled-components";
import pure from "recompose/pure";

const noop = () => {};

type Props = {
  children: Node,
  onClick?: (*) => void,
};

export default pure<Props>(function Overlay(props: Props) {
  const { children, onClick } = props;

  return (
    <Root onClick={onClick || noop}>
      <Inner>{children}</Inner>
    </Root>
  );
});

const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
