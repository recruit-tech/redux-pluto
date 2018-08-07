/* @flow */
/* eslint-disable global-require */
import assert from "assert";
import configs from "server/configs";
import AgreedSample from "../AgreedSample";

// FIXME: Load json5 by jest-transform
test.skip("AgreedSample: read success", async () => {
  // $FlowFixMe
  const getText = require("../../../../spec/agreed/agreedsample/get.json5");
  const agreedSample = new AgreedSample(configs);
  const result = await agreedSample.read();
  assert.deepStrictEqual(result, getText.response.values);
});
