import React from "react";
import Menu from "../atoms/Menu";
import MenuItem from "../atoms/MenuItem";

type Gender = "man" | "woman";

type Props = {
  gender: Gender | null;
  hairLength: string;
  hairLengthItems: {
    [key: string]: {
      items: Array<{
        name: string;
        gender: string;
        code: string;
      }>;
    };
  };
  genderItems: {
    [key: string]: {};
  };
};

export default function HairLengthMenu(props: Props) {
  const { hairLength, genderItems, hairLengthItems } = props;
  const gender = props.gender || Object.keys(genderItems)[0];
  const { items } = hairLengthItems[gender];

  return (
    <Menu>
      {items.map(item => (
        <MenuItem
          key={item.code}
          to={`/style/${item.gender}/${item.code}`}
          checked={item.code === hairLength}>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
