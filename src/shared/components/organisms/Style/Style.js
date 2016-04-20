import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import GenderMenu from '../../molecules/GenderMenu';
import HairLengthMenu from '../../molecules/HairLengthMenu';
import Children from '../../utils/Children';

export default compose(
  onlyUpdateForPropTypes,
)(class Style extends Component {

  static propTypes = {
    // from store
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,

    // from router
    children: PropTypes.object,
    params: PropTypes.shape({
      gender: PropTypes.string,
    }),
  };

  render() {
    const { genderItems, hairLengthItems, style, children, params: { gender } } = this.props;

    return (
      <div>
        <GenderMenu genderItems={genderItems} />
        <HairLengthMenu {...{ gender, genderItems, hairLengthItems }} />
        <div>
          {children ? <Children {...{ children, style }} /> : <div></div>}
        </div>
      </div>
    );
  }
});
