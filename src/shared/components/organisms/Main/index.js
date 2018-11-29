/* @flow */
import React, { type Node } from "react";
import styled from "styled-components";
import pure from "recompose/pure";

type Props = { children: Node };

export default pure<Props>(function Main(props: Props) {
  const { children } = props;

  return <Root>{children}</Root>;
});

const Root = styled.div`
  margin: 0 auto;
  padding-top: 200px;
  text-align: center;
`;
