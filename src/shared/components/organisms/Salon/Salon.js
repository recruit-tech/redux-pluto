import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      urls: PropTypes.array.isRequired,
    }).isRequired,
  }),
)(class Salon extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        {item.name}
        <a href={item.urls && item.urls.pc} target="blank">Hot peper beauty のページヘ行く</a>
      </div>
    );
  }
});
