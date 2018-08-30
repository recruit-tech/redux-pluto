/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Indicator from "../atoms/Indicator";
import Menu from "../atoms/Menu";
import MenuItem from "../atoms/MenuItem";
import Overlay from "../atoms/Overlay";
import SearchLisItem from "../atoms/SearchListItem";
import SearchMore from "../atoms/SearchMore";
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
storiesOf("Atoms/SearchListItem", module)
  .addDecorator(withScreenshot())
  .add("example", () => (
    <SearchLisItem
      item={{
        id: "item_id",
        name: "name",
        logo_image_square: "/cat_large.jpeg",
        description: "description",
      }}
      linkURL="/link"
    />
  ));
storiesOf("Atoms/SearchMore", module)
  .addDecorator(withScreenshot())
  .add("onClick", () => (
    <SearchMore onShow={action("clicked")}>
      <button type="button">more</button>
    </SearchMore>
  ));
