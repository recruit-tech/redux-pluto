import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Menu from '../../atoms/Menu';
import MenuItem from '../../atoms/MenuItem';

export default compose(
  onlyUpdateForPropTypes,
)(class HairLengthMenu extends Component {

  static propTypes = {
    gender: PropTypes.string,
    hairLength: PropTypes.string,
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,
  };

  render() {
    const { router, hairLength, genderItems, hairLengthItems } = this.props;
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
