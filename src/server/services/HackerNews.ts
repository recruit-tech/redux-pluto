import axios from "axios";
import { HackerNewsItem } from "../../shared/types/HackerNews";

const API_BASE = "https://hacker-news.firebaseio.com/v0";

export async function fetchItem(itemId: number): Promise<HackerNewsItem> {
  const res = await axios.get(`${API_BASE}/item/${itemId}.json`);
  return res.data;
}

export async function fetchTopStoryIds(): Promise<number[]> {
  const res = await axios.get(`${API_BASE}/topstories.json`);
  return res.data;
}

export async function fetchTopStories(
  page: number = 1,
): Promise<HackerNewsItem[]> {
  const ids = await fetchTopStoryIds();
  const slicedIds = ids.slice((page - 1) * 10, page * 10);
  return Promise.all(slicedIds.map(id => fetchItem(id)));
}

export default class HackerNews {
  name: string;
  requiredLogin: boolean;
  constructor() {
    this.name = "hackerNews";
    this.requiredLogin = true;
  }

  read(_req: any, _resource: any, params: { page: number }, config: any) {
    return fetchTopStories(params.page);
  }
}
