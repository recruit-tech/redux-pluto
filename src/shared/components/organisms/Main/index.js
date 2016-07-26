import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
  })
)(class Main extends Component {
  render(props = this.props) {
    const { children } =  props;

    return (
      <main className={local('root')}>
        {children}
      </main>
    );
  }
});
