import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { showOnScroll, adjustScroll, forceScroll } from '../../utils/scrollComponents';
import SalonListItem from '../../atoms/SalonListItem';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    items: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
  }),
  showOnScroll,
  adjustScroll,
  forceScroll,
)(class SalonList extends Component {
  render() {
    const { items, page } = this.props;
    if (items.length === 0) {
      return <div>サロンが見つかりませんでした</div>;
    }

    return (
      <div data-page={page}>
        <span>~~~~ {page} ~~~~</span>
        {items.map((item) => (
          <SalonListItem item={item} page={page} key={item.id} />
        ))}
      </div>
    );
  }
});
