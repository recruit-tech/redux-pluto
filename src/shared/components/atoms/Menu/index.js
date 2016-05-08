import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class Menu extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <ul role="menu" className={local('items')}>
        {children}
      </ul>
    );
  }
});
