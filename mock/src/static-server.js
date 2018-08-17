/* eslint-disable */

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(8765, () => {
  console.log(`Mock static server listening on port ${8765}`);
});
