module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["./src/__tests__/setups.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.tsx",

    "!src/**/__tests__/**/*.js",
    "!src/**/__tests__/**/*.ts",
    "!src/**/__tests__/**/*.tsx",

    "!src/**/*.test.js",
    "!src/**/*.test.ts",
    "!src/**/*.test.ts",

    "!src/webpack/*.js",
    "!src/shared/types/*.js",
    "!src/client/vendor/**/*.js",
  ],
  testMatch: [
    "**/__tests__/**.test.ts",
    "**/__tests__/**.test.tsx",
    "**/__tests__/**.test.js",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
