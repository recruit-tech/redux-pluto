import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Alert from '../../organisms/Alert';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class DefaultLayout extends Component {

  static propTypes = {
    header: PropTypes.node.isRequired,
    main: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
  };

  render() {
    const { header, main, footer } =  this.props;

    return (
      <div className={local('root')}>
        <div className={local('header')}>
          {header}
        </div>
        <div className={local('main')}>
          {main}
        </div>
        <div className={local('footer')}>
          {footer}
        </div>
        <div className={local('alert')}>
          <Alert />
        </div>
      </div>
    );
  }
});
