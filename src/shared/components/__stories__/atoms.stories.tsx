import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Indicator from "../atoms/Indicator";
import Menu from "../atoms/Menu";
import MenuItem from "../atoms/MenuItem";
import Overlay from "../atoms/Overlay";
import withScreenshot from "./withScreenshot";

storiesOf("Atoms/Indicator", module)
  .addDecorator(withScreenshot())
  .add("loading", () => <Indicator loading />);
storiesOf("Atoms/Menu", module)
  .addDecorator(withScreenshot())
  .add("MenuItems", () => (
    <Menu>
      <MenuItem to="#1" checked>
        item 1
      </MenuItem>
      <MenuItem to="#2" checked={false}>
        item 2
      </MenuItem>
      <MenuItem to="#3" checked={false}>
        item 3
      </MenuItem>
    </Menu>
  ));
storiesOf("Atoms/MenuItem", module)
  .addDecorator(withScreenshot())
  .add("to", () => (
    <MenuItem to="/to" checked={false}>
      item
    </MenuItem>
  ))
  .add("checked", () => (
    <MenuItem to="/to" checked>
      item
    </MenuItem>
  ));
storiesOf("Atoms/Overlay", module)
  .addDecorator(withScreenshot())
  .add("onClick", () => <Overlay onClick={action("clicked")}>overlay</Overlay>);
