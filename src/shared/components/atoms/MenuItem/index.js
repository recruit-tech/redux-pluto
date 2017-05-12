import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    checked: PropTypes.bool,
  }),
)(function MenuItem(props) {
  const { children, to, checked } = props;

  return (
    <li role="menuitemradio" aria-checked={checked} className={local('item')}>
      <Link to={to} className={local('link')}>
        {children}
      </Link>
    </li>
  );
});
