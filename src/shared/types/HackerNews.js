/* @flow */

export type HackerNewsItem = {
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
