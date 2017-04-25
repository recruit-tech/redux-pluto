import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import styles from './styles.scss';
import { createLocal } from '../../utils/localnames';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    loading: PropTypes.bool.isRequired,
  }),
)(class Indicator extends Component {
  render() {
    const { loading } = this.props;
    if (!loading) {
      return null;
    }

    return (
      <div className={local('loader')}></div>
    );
  }
});
