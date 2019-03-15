import React, { ReactNode } from "react";
import styled from "styled-components";

import { Link as ReactRouterLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
  checked: boolean;
};

export default function MenuItem(props: Props) {
  const { children, to, checked } = props;

  return (
    <Item checked={checked}>
      <Link to={to}>{children}</Link>
    </Item>
  );
}

const Item = styled.div.attrs({
  role: "menuitemradio",
  "aria-checked": (props: any) => props.checked,
})`
  flex-grow: 1;
  background-color: lightgrey;

  &[aria-checked="true"] {
    background-color: grey;
  }

  &:hover {
    background-color: darkgray;
  }
` as React.ComponentType<{ checked: boolean }>;

const Link = styled(ReactRouterLink)`
  display: block;
  padding: 12px 0;
`;
