/* eslint-disable */

const express = require("express");
const config = require("./config");

const app = express();

app.use(express.static(config.buildDir));

app.listen(config.staticServerPort, () => {
  console.log(
    `Mock static server listening on port ${config.staticServerPort}`,
  );
});
