import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import Counter from "../Counter";

type Props = {};

export default function Footer(props: Props) {
  const today = format(new Date(), "YYYY/MM/DD");

  return (
    <Root>
      <div>
        <Counter />
        <Today>{today}</Today>
      </div>
    </Root>
  );
}

const Root = styled.footer`
  border-color: lightgrey;
  border-width: 1px;
  border-style: solid;
  padding: 10px;
`;

const Today = styled.div`
  text-align: center;
`;
