/* @flow */
import React from "react";
import { compose, pure, type HOC } from "recompose";
import { showOnScroll, adjustScroll, forceScroll } from "shared/components/utils/scrollComponents";
import SalonListItem from "shared/components/atoms/SalonListItem";

type Props = {
  items: Array<{
    id: string,
    name: string,
    logo_image_square: string,
    description: string
  }>,
  page: number,
  linkURL: string
};

const enhance: HOC<Props, Props> = compose(pure, showOnScroll, adjustScroll, forceScroll);

export default enhance(function SalonList(props: Props) {
  const { items, page, linkURL } = props;

  if (items.length === 0) {
    return <div>サロンが見つかりませんでした</div>;
  }

  return (
    <div data-page={page}>
      <span>~~~~ {page} ~~~~</span>
      {items.map(item => <SalonListItem item={item} key={item.id} linkURL={linkURL} />)}
    </div>
  );
});
