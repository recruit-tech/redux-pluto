import { test } from "eater/runner";
import assert from "power-assert";
import configs from "server/configs";
import AgreedSample from "../AgreedSample";

const getText = require("../../../../spec/agreed/agreedsample/get.json5");

test("AgreedSample: read success", () => {
  const agreedSample = new AgreedSample(configs);
  agreedSample.read().then(result => {
    assert.deepEqual(result, getText.response.values);
  });
});
