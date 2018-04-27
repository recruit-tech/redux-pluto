/* @flow */
import React from "react";
import { type HackerNewsItem } from "shared/types/HackerNews";

type Props = {
  item: HackerNewsItem
};

export default function ListItem({ item }: Props) {
  return (
    <div>
      <a href={item.url} target="_blank">
        {item.title}
      </a>
    </div>
  );
}
