/* @flow */
import React, { type Node } from "react";
import styled from "styled-components";
import pure from "recompose/pure";

type Props = {
  main: Node,
};

export default pure((props: Props) => {
  const { main } = props;

  return (
    <Root>
      <Main>{main}</Main>
    </Root>
  );
});


const Root = styled.div``;
const Main = styled.div``;
