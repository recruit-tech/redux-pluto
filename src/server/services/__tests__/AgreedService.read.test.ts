/* eslint-disable global-require */
import assert from "power-assert";
import config from "../../configs/test";
import AgreedService from "../AgreedService";

test("AgreedService: read success", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/get.js");
  const agreedService: any = new AgreedService(
    config,
    "foo",
    "/agreedsample",
    "foo",
  );
  const result = await agreedService.read();
  assert.deepStrictEqual(result, getText.response.values);
});

test("AgreedService: read failure", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/failure_get.js");
  const agreedService: any = new AgreedService(config, "foo", "/agreedsample", {
    stats: 404,
  });
  const result = await agreedService.read();
  assert.deepStrictEqual(result, getText.response.values);
});
