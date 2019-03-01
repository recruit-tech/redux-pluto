/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import assert from "assert";
import configs from "../../configs";
import AgreedSample from "../AgreedSample";

test("AgreedSample: read success", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/get");

  const agreedSample = new AgreedSample(configs);
  const result = await (agreedSample.read as any)({}, {}, {});
  assert.deepStrictEqual(result, getText.response.values);
});
