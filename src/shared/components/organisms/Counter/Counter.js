import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import styles from './styles.scss';

export default compose(
  onlyUpdateForPropTypes,
)(class Counter extends Component {

  static propTypes = {
    counterValue: PropTypes.number.isRequired,
  };

  render() {
    const { counterValue } = this.props;

    return (
      <div className={styles.main}>access counter: {counterValue || ''}</div>
    );
  }
});
