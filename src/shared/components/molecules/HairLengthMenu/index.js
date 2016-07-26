import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Menu from '../../atoms/Menu';
import MenuItem from '../../atoms/MenuItem';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    gender: PropTypes.string,
    hairLength: PropTypes.string,
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,
  }),
)(class HairLengthMenu extends Component {
  render(props = this.props) {
    const { router, hairLength, genderItems, hairLengthItems } = props;
    const gender = props.gender || Object.keys(genderItems)[0];
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
