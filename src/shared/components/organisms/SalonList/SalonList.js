import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { Link } from 'react-router';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  setPropTypes({
    count: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
  }),
)(class SalonList extends Component {
  render() {
    const { count, items } = this.props;
    return (
      <div>
        <div>
          <span>{count || 0}</span><span>件あります</span>
        </div>
        {items.map((item) => (
          <div key={item.id}>
            <img src={item.logo_image_square} />
            <Link to={`/salon/${item.id}`}>{item.name}</Link>
          </div>
        ))}
      </div>
    );
  }
});
