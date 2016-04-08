import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import GenderMenu from '../../mols/GenderMenu';
import HairLengthMenu from '../../mols/HairLengthMenu';
import Children from '../../utils/Children';

export default compose(
  connect(
    (state) => ({
      genderItems: state.masters.genderMaster.items,
      hairLengthItems: state.masters.hairLengthMaster.items,
      style: state.style,
    })
  ),
  onlyUpdateForPropTypes,
)(class Style extends Component {

  static propTypes = {
    // from store via connect()
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,

    // from router
    children: PropTypes.object,
    params: PropTypes.shape({
      gender: PropTypes.string,
    }),
  };

  render() {
    const { children, genderItems, hairLengthItems, style, params: { gender } } = this.props;

    return (
      <div>
        <GenderMenu genderItems={genderItems} />
        <HairLengthMenu {...{ gender, genderItems, hairLengthItems }} />
        {children ? <Children {...{ children, style }} /> : <div></div>}
      </div>
    );
  }
});
