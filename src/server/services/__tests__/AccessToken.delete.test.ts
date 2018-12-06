import assert from "assert";
import cookie from "cookie";
import configs from "../../configs";
import AccessToken from "../AccessToken";

test("AccessToken: delete success", async () => {
  const accessToken = new AccessToken(configs);

  const response = await (accessToken as any).delete();
  const cookies = response.meta.headers["set-cookie"];
  const parsedCookie = cookie.parse(cookies);
  assert.strictEqual(parsedCookie["access-token"], "null");
  assert.strictEqual(parsedCookie.Expires, "Thu, 01 Jan 1970 00:00:00 GMT");
});
