import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class Main extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children } =  this.props;

    return (
      <main className={local('root')}>
        {children}
      </main>
    );
  }
});
