import React, { memo } from "react";
import styled from "styled-components";

function Counter(props: { counterValue: any }) {
  const { counterValue } = props;
  return <Root>access counter: {counterValue || ""}</Root>;
}

Counter.displayName = "Counter";

export default memo(Counter);

const Root = styled.div`
  text-align: center;
`;
