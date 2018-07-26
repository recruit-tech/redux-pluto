import React from "react";
import { mount } from "enzyme";
import assert from "power-assert";
import Indicator, { Loader } from "../Indicator";

test("Indicator: loading", () => {
  const props = { loading: true };
  const wrapper = mount(<Indicator {...props} />);
  assert.equal(wrapper.find(Loader).length, 1);
});

test("Indicator: not loading", () => {
  const props = { loading: false };
  const wrapper = mount(<Indicator {...props} />);
  assert.equal(wrapper.find(Loader).length, 0);
});
