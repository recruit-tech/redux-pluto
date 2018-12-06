
import React from "react";
import styled from "styled-components";
import { HackerNewsItem } from "../../../types/HackerNews";
import ListItem from "./ListItem";

type Props = {
  items: HackerNewsItem[],
  loading: boolean,
};

export default function HackerNews(props: Props) {
  const { items, loading } = props;
  return (
    <Container>
      <Title>HackerNews</Title>
      {loading && "loading..."}
      <ItemListContainer>
        {items.map(item => (
          <ItemContainer key={item.id}>
            <ListItem item={item} />
          </ItemContainer>
        ))}
      </ItemListContainer>
    </Container>
  );
}

const Title = styled.h1``;

const Container = styled.div`
  width: 100%;
`;

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  width: 100%;
`;
