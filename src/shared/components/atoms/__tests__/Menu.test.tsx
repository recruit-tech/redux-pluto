import assert from "assert";
import React from "react";
import { mount } from "enzyme";
import Menu from "../Menu";

const MenuItem = () => <div>MenuItem</div>;

test.only("Menu: has children", () => {
  const wrapper = mount(
    <Menu>
      <MenuItem />
      <MenuItem />
    </Menu>,
  );
  assert.strictEqual(wrapper.find(MenuItem).length, 2);
});
