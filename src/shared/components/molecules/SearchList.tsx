
import React from "react";
import { compose, pure } from "recompose";
import {
  showOnScroll,
  adjustScroll,
  forceScroll,
} from "../utils/scrollComponents";
import SearchListItem from "../atoms/SearchListItem";

type Props = {
  items: Array<{
    id: string,
    name: string,
    logo_image_square: string,
    description: string,
  }>,
  page: number,
  linkURL: string,
};

const enhance = compose(
  pure,
  showOnScroll,
  adjustScroll,
  forceScroll,
) as any;

export default enhance(function SearchList(props: Props) {
  const { items, page, linkURL } = props;

  if (items.length === 0) {
    return <div>サロンが見つかりませんでした</div>;
  }

  return (
    <div data-page={page}>
      <span>~~~~ {page} ~~~~</span>
      {items.map(item => (
        <SearchListItem item={item} key={item.id} linkURL={linkURL} />
      ))}
    </div>
  );
});
