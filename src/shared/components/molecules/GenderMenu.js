/* @flow */
import React from "react";
import pure from "recompose/pure";
import Menu from "../atoms/Menu";
import MenuItem from "../atoms/MenuItem";

type Gender = "man" | "woman";
type Props = {
  gender: ?Gender,
  genderItems: {
    [Gender]: {
      name: string,
    },
  },
};

export default pure<Props>(function GenderMenu(props: Props) {
  const { genderItems } = props;
  const gender: Gender = props.gender || Object.keys(genderItems)[0];

  return (
    <div>
      <Menu>
        {Object.keys(genderItems).map(code => (
          <MenuItem key={code} to={`/style/${code}`} checked={code === gender}>
            {genderItems[code].name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});
