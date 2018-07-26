import React from "react";
import { mount } from "enzyme";
import assert from "power-assert";
import Menu from "../Menu";

const MenuItem = () => <div>MenuItem</div>;

test("Menu: has children", () => {
  const wrapper = mount(
    <Menu>
      <MenuItem />
      <MenuItem />
    </Menu>,
  );
  assert.equal(wrapper.find(MenuItem).length, 2);
});
