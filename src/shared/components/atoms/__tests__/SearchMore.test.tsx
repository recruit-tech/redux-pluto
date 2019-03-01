import assert from "assert";
import React from "react";
import { mount } from "enzyme";
import SearchMore from "../SearchMore";

const Item = () => <div>Item</div>;

test("SearchMore: onShow", () => {
  const onShow = jest.fn();
  const wrapper = mount(
    <SearchMore onShow={onShow}>
      <Item />
    </SearchMore>,
  );
  wrapper.simulate("click");
  wrapper.simulate("keydown");
  assert.strictEqual(onShow.mock.calls.length, 2);
});

test("SearchMore: has children", () => {
  const onShow = jest.fn();
  const wrapper = mount(
    <SearchMore onShow={onShow}>
      <Item />
    </SearchMore>,
  );
  wrapper.simulate("click");
  assert.strictEqual(wrapper.find(Item).length, 1);
});
