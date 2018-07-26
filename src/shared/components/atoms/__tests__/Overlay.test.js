import React from "react";
import { mount } from "enzyme";
import assert from "power-assert";
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
  assert.equal(onClick.mock.calls.length, 1);
});

test("Overlay: has children", () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <Overlay onClick={onClick}>
      <Text />
    </Overlay>,
  );
  assert.equal(wrapper.find(Text).length, 1);
});
