import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { showOnScroll, adjustScroll, forceScroll } from 'shared/components/utils/scrollComponents';
import AgreedSalonListItem from 'shared/components/atoms/AgreedSalonListItem';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    items: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
  }),
  showOnScroll,
  adjustScroll,
  forceScroll,
)(function SalonList(props) {
  const { items, page } = props;

  if (items.length === 0) {
    return (
      <div>サロンが見つかりませんでした</div>
    );
  }

  return (
    <div data-page={page}>
      <span>~~~~ {page} ~~~~</span>
      {items.map((item) => (
        <AgreedSalonListItem item={item} page={page} key={item.id} />
      ))}
    </div>
  );
});
