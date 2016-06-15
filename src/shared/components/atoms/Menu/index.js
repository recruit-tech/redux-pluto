import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
  }),
)(class Menu extends Component {
  render() {
    const { children } = this.props;

    return (
      <ul role="menu" className={local('items')}>
        {children}
      </ul>
    );
  }
});
