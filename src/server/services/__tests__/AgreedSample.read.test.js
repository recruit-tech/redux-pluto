/* @flow */
/* eslint-disable global-require */
import assert from "assert";
import configs from "server/configs";
import AgreedSample from "../AgreedSample";

test("AgreedSample: read success", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/get.js");
  const agreedSample = new AgreedSample(configs);
  const result = await agreedSample.read();
  assert.deepStrictEqual(result, getText.response.values);
});
