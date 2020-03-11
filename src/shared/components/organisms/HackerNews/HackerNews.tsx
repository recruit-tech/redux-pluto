import React from "react";
import styled from "styled-components";
import useDocumentTitle from "../../utils/useDocumentTitle";
import { HackerNewsItem } from "../../../types/HackerNews";
import ListItem from "./ListItem";

type Props = {
  items: HackerNewsItem[];
  loading: boolean;
  title: string;
};

export default function HackerNews(props: Props) {
  const { items, loading, title } = props;
  useDocumentTitle(title);
  return (
    <Container>
      <Title>{title}</Title>
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
