import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    counterValue: PropTypes.number.isRequired,
  })
)(function Counter(props) {
  const { counterValue } = props;

  return (
    <div className={local('root')}>
      access counter: {counterValue || ''}
    </div>
  );
});
