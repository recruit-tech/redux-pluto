import { configure, addDecorator } from "@storybook/react";
import { initScreenshot } from "storybook-chrome-screenshot";
addDecorator(initScreenshot());

function loadStories() {
  const req = require.context("../src/shared/components", true, /stories\.js$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
