import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    item: PropTypes.shape({
      name: PropTypes.string,
      urls: PropTypes.shape({
        pc: PropTypes.string,
      }),
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
