import assert from "assert";
import React from "react";
import { mount } from "enzyme";
import Overlay from "../Overlay";

const Text = () => <div>Text</div>;

test("Overlay: onClick", () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <Overlay onClick={onClick}>
      <Text />
    </Overlay>,
  );
  wrapper.simulate("click");
  assert.strictEqual(onClick.mock.calls.length, 1);
});

test("Overlay: has children", () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <Overlay onClick={onClick}>
      <Text />
    </Overlay>,
  );
  assert.strictEqual(wrapper.find(Text).length, 1);
});
