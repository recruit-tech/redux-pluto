import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import GenderLink from './GenderLink';

export default compose(
  onlyUpdateForPropTypes,
)(class GenderMenu extends Component {

  static propTypes = {
    gender: PropTypes.string,
    genderItems: PropTypes.object.isRequired,
  };

  render() {
    const { genderItems } = this.props;
    const gender = this.props.gender || Object.keys(genderItems)[0];

    return (
      <div>
        {Object.keys(genderItems).map((genderCode) => (
          <GenderLink key={genderCode} gender={genderItems[genderCode]} />
        ))}
      </div>
    );
  }
});
