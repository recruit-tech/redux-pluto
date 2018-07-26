import React from "react";
import { mount } from "enzyme";
import assert from "power-assert";
import MenuItem from "../MenuItem";

const LinkText = () => <div>LinkText</div>;

test("MenuItem: checked", () => {
  const props = {
    to: "/to",
    checked: true,
  };
  const wrapper = mount(
    <MenuItem {...props}>
      <LinkText />
    </MenuItem>,
  );
  assert.equal(wrapper.getDOMNode().getAttribute("aria-checked"), "true");
});

test("MenuItem: has children", () => {
  const props = {
    to: "/to",
    checked: true,
  };
  const wrapper = mount(
    <MenuItem {...props}>
      <LinkText />
    </MenuItem>,
  );
  assert.equal(wrapper.find(LinkText).length, 1);
});
