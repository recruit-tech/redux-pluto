module.exports = {
  setupFiles: ["./src/__tests__/setups.js"],
  testMatch: ["**/__tests__/*.test.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/__tests__/**/*.js",
    "!src/**/*.test.js",
    "!src/webpack/*.js",
    "!src/shared/types/*.js",
    "!src/client/vendor/**/*.js",
  ],
};
