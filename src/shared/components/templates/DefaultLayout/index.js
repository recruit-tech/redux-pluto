import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Alert from 'shared/components/organisms/Alert';
import GlobalIndicator from 'shared/components/organisms/GlobalIndicator';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    header: PropTypes.node.isRequired,
    main: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
  }),
)(function DefaultLayout(props) {
  const { header, main, footer } = props;

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
      <div className={local('indicator')}>
        <GlobalIndicator />
      </div>
    </div>
  );
});
