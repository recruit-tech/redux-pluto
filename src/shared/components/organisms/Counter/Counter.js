/* @flow */
import React from "react";
import styled from "styled-components";
import pure from "recompose/pure";

type Props = {
  counterValue?: number,
};

export default pure<Props>(function Counter(props: Props) {
  const { counterValue } = props;
  return <Root>access counter: {counterValue || ""}</Root>;
});

const Root = styled.div`
  text-align: center;
`;
