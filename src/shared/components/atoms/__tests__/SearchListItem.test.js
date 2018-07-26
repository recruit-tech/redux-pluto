import React from "react";
import { mount } from "enzyme";
import assert from "power-assert";
import { Link } from "react-router";
import SearchListItem, { Description } from "../SearchListItem";

test("SearchListItem: rendered correctly", () => {
  const props = {
    item: {
      id: "item_id",
      name: "item_name",
      logo_image_square: "item_logo",
      description: "item_desc",
    },
    linkURL: "link",
  };
  const wrapper = mount(<SearchListItem {...props} />);
  assert.equal(wrapper.find("img").prop("src"), props.item.logo_image_square);
  assert.equal(wrapper.find("img").prop("alt"), props.item.name);
  assert.equal(
    wrapper.find(Link).prop("to"),
    `${props.linkURL}/${props.item.id}`,
  );
  assert.equal(wrapper.find(Link).text(), props.item.name);
  assert.equal(wrapper.find(Description).text(), props.item.description);
});
