import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import KeepElementSize from '../../utils/KeepElementSize';
import { searchStyle } from '../../../redux/modules/style';

export default compose(
  asyncConnect([
    { promise: ({ params, store: { dispatch } }) => dispatch(searchStyle(params)) },
  ]),
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
        <KeepElementSize name="style-list">
          <div>
            {items.map((item) => (
              <span key={item.id}>
                <img src={item.photo.front.m} />
              </span>
            ))}
          </div>
        </KeepElementSize>
      </div>
    );
  }
});
