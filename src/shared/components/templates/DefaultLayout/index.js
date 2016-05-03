import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';
import Alert from '../../organisms/Alert';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class DefaultLayout extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children } =  this.props;

    return (
      <div className={local('main')}>
        <div className={local('header')}>
          <Header />
        </div>
        <div className={local('content')}>
          {children}
        </div>
        <div className={local('footer')}>
          <Footer />
        </div>
        <div className={local('alert')}>
          <Alert />
        </div>
      </div>
    );
  }
});
