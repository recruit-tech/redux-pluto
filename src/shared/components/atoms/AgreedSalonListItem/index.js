import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { Link } from 'react-router';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      logo_image_square: PropTypes.string,
    }).isRequired,
  }),
)(function SalonListItem(props) {
  const { item } = props;

  return (
    <div className={local('root')}>
      <div className={local('shopName')}>
        <img src={item.logo_image_square} alt={item.name} />
        <Link to={`/agreedsalon/${item.id}`}>{item.name}</Link>
      </div>
      <div className={local('description')}>{item.description}</div>
    </div>
  );
});
