/* @flow */
import { fetch } from "shadow-fetch";
import { type HackerNewsItem } from "shared/types/HackerNews";

const API_BASE = "https://hacker-news.firebaseio.com/v0";

export async function fetchItem(itemId: number): Promise<HackerNewsItem> {
  const res = await fetch(`${API_BASE}/item/${itemId}.json`);
  return res.json();
}

export async function fetchTopStoryIds(): Promise<number[]> {
  const res = await fetch(`${API_BASE}/topstories.json`);
  return res.json();
}

export async function fetchTopStories(page: number = 1): Promise<HackerNewsItem[]> {
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
