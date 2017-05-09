import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import SalonList from 'shared/components/molecules/SalonList';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    items: PropTypes.object.isRequired,
    onInnerWindow: PropTypes.func.isRequired,
    shouldAdjustScroll: PropTypes.bool.isRequired,
    forceScrollTo: PropTypes.object.isRequired,
  }),
)(class SalonLists extends Component {
  render() {
    const { items, onInnerWindow, shouldAdjustScroll, forceScrollTo } = this.props;
    return (
      <div className={local('root')}>
        {Object.keys(items).map((page) => (
          <SalonList
            items={items[page]}
            page={+page}
            onInnerWindow={onInnerWindow}
            heightRatio={0.5}
            key={page}
            shouldAdjustScroll={shouldAdjustScroll}
            forceScrollTo={forceScrollTo}
          />
        ))}
      </div>
    );
  }
});
