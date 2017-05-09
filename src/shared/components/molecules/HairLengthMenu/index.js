import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Menu from 'shared/components/atoms/Menu';
import MenuItem from 'shared/components/atoms/MenuItem';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    gender: PropTypes.string,
    hairLength: PropTypes.string,
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,
  }),
)(class HairLengthMenu extends Component {
  render() {
    const { hairLength, genderItems, hairLengthItems } = this.props;
    const gender = this.props.gender || Object.keys(genderItems)[0];
    const items = hairLengthItems[gender].items;

    return (
      <Menu>
        {items.map((item) => (
          <MenuItem
            key={item.code}
            to={`/style/${item.gender}/${item.code}`}
            checked={item.code === hairLength}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    );
  }
});
