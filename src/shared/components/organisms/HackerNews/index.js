/* @flow */
/* eslint-disable */
import React, { Fragment } from "react";
import styled from "styled-components";

const API_BASE = "https://hacker-news.firebaseio.com/v0";

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

export async function fetchItem(itemId: number): Promise<Item> {
  const res = await fetch(`${API_BASE}/item/${itemId}.json`);
  return res.json();
}

export async function fetchTopStoryIds(): Promise<number[]> {
  const res = await fetch(`${API_BASE}/topstories.json`);
  return res.json();
}

export async function fetchTopStories(page: number = 1): Promise<Item[]> {
  const ids = await fetchTopStoryIds();
  const slicedIds = ids.slice((page - 1) * 10, page * 10);
  return Promise.all(slicedIds.map(id => fetchItem(id)));
}

type State = {
  items: Item[],
  page: number,
  loading: boolean
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

export default class HackerNews extends React.Component<*, State> {
  constructor() {
    super();
    this.state = {
      items: [],
      page: 1,
      loading: false
    };
  }

  async componentDidMount() {
    this.setState(state => ({ ...state, loading: true }));
    const items = await fetchTopStories(1);
    this.setState(state => ({ ...state, items, loading: false }));
  }

  async componentDidUpdate(_: *, oldState: State) {
    if (oldState.page !== this.state.page) {
      console.log("did update: onChange page");
      this.setState(state => ({ ...state, loading: true }));
      const items = await fetchTopStories(this.state.page);
      this.setState(state => ({ ...state, items, loading: false }));
    }
  }

  render() {
    const { items, page, loading } = this.state;
    return (
      <Container>
        <Title>HackerNews</Title>
        <Pager
          page={page}
          maxPage={10}
          loading={loading}
          onClickPrev={() => this.setState({ page: page - 1, loading: true })}
          onClickNext={() => this.setState({ page: page + 1, loading: true })}
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
