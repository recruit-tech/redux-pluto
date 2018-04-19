import { configure } from "@storybook/react";

function loadStories() {
  const req = require.context("../src/shared/components", true, /stories\.js$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
