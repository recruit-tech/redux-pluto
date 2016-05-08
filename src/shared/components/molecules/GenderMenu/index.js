import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Menu from '../../atoms/Menu';
import MenuItem from '../../atoms/MenuItem';

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
        <Menu>
          {Object.keys(genderItems).map((code) => (
            <MenuItem key={code} to={`/style/${code}`} checked={code === gender}>
              {genderItems[code].name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
});
