import React from "react";
import renderer from "react-test-renderer";
import Counter from "../Counter";

test("Counter: render correctly", () => {
  const tree = renderer.create(<Counter counterValue={1} />).toJSON();
  expect(tree).toMatchSnapshot();
});
