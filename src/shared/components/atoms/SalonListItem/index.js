import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { Link } from 'react-router';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    item: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
  }),
)(class SalonListItem extends Component {
  render() {
    const { item, page } = this.props;
    return (
      <div className={local('root')}>
        <img src={item.logo_image_square} />
        <Link to={`/salon/${item.id}`}>{item.name}</Link>
      </div>
    );
  }
});
