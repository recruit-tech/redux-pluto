import assert from "assert";
import React from "react";
import { mount } from "enzyme";
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
  assert.strictEqual(wrapper.getDOMNode().getAttribute("aria-checked"), "true");
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
  assert.strictEqual(wrapper.find(LinkText).length, 1);
});
