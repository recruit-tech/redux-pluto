import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import HairLengthLink from './HairLengthLink';

export default compose(
  onlyUpdateForPropTypes,
)(class HairLengthMenu extends Component {

  static propTypes = {
    gender: PropTypes.string,
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,
  };

  render() {
    const { genderItems, hairLengthItems } = this.props;
    const gender = this.props.gender || Object.keys(genderItems)[0];
    const items = hairLengthItems[gender].items;

    return (
      <div>
        {items.map((item) => (
          <HairLengthLink key={item.code} hairLength={item} />
        ))}
      </div>
    );
  }
});
