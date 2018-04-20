/* @flow */
// Do nothing as storybook decorator
const NoopDecorator = fn => fn();

// Avoid accessing to stroybook-chrome-screenshot in CI
export default () => {
  try {
    /* eslint-disable global-require */
    const { withScreenshot } = require("storybook-chrome-screenshot");
    return withScreenshot();
  } catch (e) {
    return NoopDecorator;
  }
};
