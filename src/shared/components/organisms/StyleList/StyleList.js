import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import styles from './styles.css';

export default compose(
  onlyUpdateForPropTypes,
)(class StyleList extends Component {

  static propTypes = {
    style: PropTypes.shape({
      count: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        photo: PropTypes.shape({
          front: PropTypes.shape({
            m: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  };

  render() {
    const { style: { count, items } } = this.props;

    return (
      <div>
        <div>
          <span>{count || 0}</span><span>件あります</span>
        </div>
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.item}>
              <img
                className={styles.img}
                src={item.photo.front.m} />
            </div>
          ))}
        </div>
      </div>
    );
  }
});
