import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { searchStyle } from '../../../redux/modules/style';

export default compose(
  asyncConnect([
    { promise: ({ params, store: { dispatch } }) => dispatch(searchStyle(params)) },
  ]),
  onlyUpdateForPropTypes,
)(class StyleList extends Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
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
            <div key={item.id}>
              <img src={item.photo.front.m} />
            </div>
          ))}
        </div>
      </div>
    );
  }
});
