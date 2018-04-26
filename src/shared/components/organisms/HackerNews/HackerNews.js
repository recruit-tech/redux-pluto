/* @flow */
import React from "react";
import styled from "styled-components";

type Item = {
  by: string,
  descendants: string,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string
};

function HNItem({ item }: { item: Item }) {
  return (
    <div>
      <a href={item.url} target="_blank">
        {item.title}
      </a>
    </div>
  );
}

function Pager({
  page,
  loading,
  maxPage,
  onClickNext,
  onClickPrev
}: {
  page: number,
  maxPage: number,
  loading: boolean,
  onClickPrev: Function,
  onClickNext: Function
}) {
  return (
    <div>
      {page > 1 && <button onClick={onClickPrev}>prev</button>}
      Page: {page}
      {page < 10 && <button onClick={onClickNext}>next</button>}
      {loading && "- Loading..."}
    </div>
  );
}

type Props = {
  items: Item[],
  page: number,
  loading: boolean
};

export default function HackerNews(props: Props) {
  const { items, page, loading } = props;
  return (
    <Container>
      <Title>HackerNews</Title>
      <Pager
        page={page}
        maxPage={10}
        loading={loading}
        onClickPrev={() => null /* TODO: paging - 1 */}
        onClickNext={() => null /* TODO: paging + 1 */}
      />
      <ItemListContainer>
        {items.map(item => (
          <ItemContainer key={item.id}>
            <HNItem item={item} />
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
