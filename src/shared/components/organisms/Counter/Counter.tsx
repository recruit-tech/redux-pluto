
import React from "react";
import styled from "styled-components";
import pure from "recompose/pure";

export default pure(function Counter(props: { counterValue: any }) {
  const { counterValue } = props;
  return <Root>access counter: {counterValue || ""}</Root>;
});

const Root = styled.div`
  text-align: center;
`;
