/* @flow */
import "isomorphic-unfetch";

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

export default class HackerNews {
  name: string;
  constructor() {
    this.name = "hackerNews";
  }

  read(_req: *, _resource: *, params: { page: number }, config: any) {
    return fetchTopStories(params.page);
  }
}
