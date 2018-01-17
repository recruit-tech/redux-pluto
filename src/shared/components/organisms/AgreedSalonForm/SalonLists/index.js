import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import AgreedSalonList from 'shared/components/molecules/AgreedSalonList';
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
)(function SalonLists(props) {
  const { items, onInnerWindow, shouldAdjustScroll, forceScrollTo } = props;

  return (
    <div className={local('root')}>
      {Object.keys(items).map((page) => (
        <AgreedSalonList
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
});
