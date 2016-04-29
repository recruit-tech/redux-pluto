import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class StyleList extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      photo: PropTypes.shape({
        front: PropTypes.shape({
          m: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
  };

  render() {
    const { count, items } = this.props;

    return (
      <div>
        <div>
          <span>{count || 0}</span><span>件あります</span>
        </div>
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className={local('item')}>
              <img
                className={local('img')}
                src={item.photo.front.m} />
            </div>
          ))}
        </div>
      </div>
    );
  }
});
