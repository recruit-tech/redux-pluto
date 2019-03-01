import assert from "assert";
import React from "react";
import { mount } from "enzyme";
import Indicator, { Loader } from "../Indicator";

test("Indicator: loading", () => {
  const props = { loading: true };
  const wrapper = mount(<Indicator {...props} />);
  assert.strictEqual(wrapper.find(Loader).length, 1);
});

test("Indicator: not loading", () => {
  const props = { loading: false };
  const wrapper = mount(<Indicator {...props} />);
  assert.strictEqual(wrapper.find(Loader).length, 0);
});
