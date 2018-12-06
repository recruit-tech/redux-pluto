
import React from "react";
import { HackerNewsItem } from "../../../types/HackerNews";

type Props = {
  item: HackerNewsItem,
};

export default function ListItem({ item }: Props) {
  return (
    <div>
      <a href={item.url}>{item.title}</a>
    </div>
  );
}
