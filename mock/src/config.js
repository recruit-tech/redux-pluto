/* eslint-disable */
const path = require("path");

module.exports = {
  baseUrl: "http://localhost:3000",
  buildDir: path.resolve(__dirname, "../build"),
  loggerPort: 8888,
  logFilepath: "public/mocking.log.js",
  logInjectionKey: "__MOCKING_LOG__",
  headless: true,
};
