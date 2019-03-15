import React, { memo } from "react";
import styled from "styled-components";

export default memo(function Counter(props: { counterValue: any }) {
  const { counterValue } = props;
  return <Root>access counter: {counterValue || ""}</Root>;
});

const Root = styled.div`
  text-align: center;
`;
