/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import assert from "power-assert";
import config from "../../configs/test";
import AgreedService from "../AgreedService";

test("AgreedService: read success", async () => {
  const getText = require("../../../../spec/agreed/agreedsample/get.ts");
  const agreedService: any = new AgreedService(
    config,
    "foo",
    "/agreedsample",
    "foo",
  );
  const result = await agreedService.read({ headers: {} });
  assert.deepStrictEqual(result, getText.response.values);
});

test("AgreedService: forbidden path traversal", async done => {
  const agreedService: any = new AgreedService(
    config,
    "foo",
    "/something/../agreedsample",
    "foo",
  );
  agreedService.read({ headers: {} }).then(done.fail, (e: any) => {
    assert.strictEqual(e.statusCode, 403);
    assert.strictEqual(e.message, "Forbidden");
    done();
  });
});
