import { addDecorator } from "@storybook/react";
import { initScreenshot } from "storybook-chrome-screenshot";

addDecorator(initScreenshot());
require("../.storybook/config");
