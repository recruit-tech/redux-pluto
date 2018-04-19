/* @flow */
import { configure } from "@storybook/react";

const req = (require: any).context("../src/shared", true, /stories\.js$/);
const loadStories = req.keys().forEach(req);

configure(loadStories, module);
