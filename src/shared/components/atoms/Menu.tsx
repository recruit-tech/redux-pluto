import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode,
};

export default (function Menu(props: Props) {
  const { children } = props;

  return <MenuItems>{children}</MenuItems>;
});

const MenuItems = styled.div`
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`;
