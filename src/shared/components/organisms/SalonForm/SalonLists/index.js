import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import SalonList from 'shared/components/molecules/SalonList';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    page: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired,
    onInnerWindow: PropTypes.func.isRequired,
    shouldAdjustScroll: PropTypes.bool.isRequired,
    forceScrollTo: PropTypes.object.isRequired,
    linkURL: PropTypes.string.isRequired,
  }),
)(function SalonLists(props) {
  const { items, onInnerWindow, shouldAdjustScroll, forceScrollTo, linkURL } = props;

  return (
    <div className={local('root')}>
      {Object.keys(items).map((page) => (
        <SalonList
          items={items[page]}
          linkURL={linkURL}
          page={+page}
          onInnerWindow={onInnerWindow}
          heightRatio={1.0}
          key={page}
          shouldAdjustScroll={+page === props.page && shouldAdjustScroll}
          forceScrollTo={forceScrollTo}
        />
      ))}
    </div>
  );
});
