/* @flow */
import React from "react";
import styled from "styled-components";
import pure from "recompose/pure";

export default pure(function Main(props) {
  const { children } = props;

  return <Root>{children}</Root>;
});

const Root = styled.div`
  margin: 0 auto;
  padding-top: 200px;
  text-align: center;
`;
