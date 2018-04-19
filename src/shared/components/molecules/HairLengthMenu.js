/* @flow */
import React from "react";
import { pure } from "recompose";
import Menu from "shared/components/atoms/Menu";
import MenuItem from "shared/components/atoms/MenuItem";

type Gender = "man" | "woman";

type Props = {
  gender: ?Gender,
  hairLength: string,
  hairLengthItems: {
    [Gender]: {
      items: Array<{
        name: string,
        gender: string,
        code: string
      }>
    }
  },
  genderItems: {
    [Gender]: {}
  }
};

export default pure(function HairLengthMenu(props: Props) {
  const { hairLength, genderItems, hairLengthItems } = props;
  const gender = props.gender || Object.keys(genderItems)[0];
  const { items } = hairLengthItems[gender];

  return (
    <Menu>
      {items.map(item => (
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
});
