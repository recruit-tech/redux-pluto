import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import GenderMenu from '../../molecules/GenderMenu';
import HairLengthMenu from '../../molecules/HairLengthMenu';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    // from store
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,

    // from router
    children: PropTypes.object,
    params: PropTypes.shape({
      gender: PropTypes.string,
      hairLength: PropTypes.string,
    }),
  }),
)(class Style extends Component {
  render() {
    const { genderItems, hairLengthItems, children, params: { gender, hairLength } } = this.props;

    return (
      <div>
        <GenderMenu genderItems={genderItems} gender={gender} />
        <HairLengthMenu {...{ gender, hairLength, genderItems, hairLengthItems }} />
        <div>
          {children}
        </div>
      </div>
    );
  }
});
