import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    counterValue: PropTypes.number.isRequired,
  })
)(class Counter extends Component {
  render() {
    const { counterValue } = this.props;

    return (
      <div className={local('root')}>
        access counter: {counterValue || ''}
      </div>
    );
  }
});
