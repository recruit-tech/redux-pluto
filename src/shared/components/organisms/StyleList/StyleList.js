import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    style: PropTypes.shape({
      count: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        photo: PropTypes.shape({
          front: PropTypes.shape({
            m: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }),
)(function StyleList(props) {
  const { style: { count, items } } = props;

  return (
    <div>
      <div>
        <span>{count || 0}</span><span>件あります</span>
      </div>
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className={local('item')}
          >
            <img
              className={local('img')}
              src={item.photo.front.m}
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
