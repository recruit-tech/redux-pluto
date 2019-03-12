import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = { children: ReactNode };

function Main(props: Props) {
  const { children } = props;
  return <Root>{children}</Root>;
}

export default Main;

const Root = styled.div`
  margin: 0 auto;
  padding-top: 200px;
  text-align: center;
`;
