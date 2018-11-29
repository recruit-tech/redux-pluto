/* @flow */
import React from "react";
import styled from "styled-components";
import pure from "recompose/pure";
import { Link } from "react-router";

type Props = {
  item: {
    id: string,
    name: string,
    logo_image_square: string,
    description: string,
  },
  linkURL: string,
};

export default pure<Props>(function SearchListItem(props: Props) {
  const { item, linkURL } = props;

  return (
    <Root>
      <ShopName>
        <img src={item.logo_image_square} alt={item.name} />
        <Link to={`${linkURL}/${item.id}`}>{item.name}</Link>
      </ShopName>
      <Description>{item.description}</Description>
    </Root>
  );
});

const Root = styled.div`
  height: 200px;
  width: 100%;
  border: thin solid black;
`;

const ShopName = styled.div`
  float: left;
`;

export const Description = styled.div`
  clear: left;
  font-size: 5px;
  border: thin solid grey;
  height: 100px;
  text-align: left;
`;
