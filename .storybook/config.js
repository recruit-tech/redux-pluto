import { configure } from "@storybook/react";

function loadStories() {
  require("../src/shared/components/__stories__/example.stories");
}

configure(loadStories, module);
