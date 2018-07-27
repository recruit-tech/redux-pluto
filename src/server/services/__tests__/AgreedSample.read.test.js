/* @flow */
/* eslint-disable global-require */
import assert from "power-assert";
import configs from "server/configs";
import AgreedSample from "../AgreedSample";

test("AgreedSample: read success", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/get.json5");
  const agreedSample = new AgreedSample(configs);
  const result = await agreedSample.read();
  assert.deepEqual(result, getText.response.values);
});
