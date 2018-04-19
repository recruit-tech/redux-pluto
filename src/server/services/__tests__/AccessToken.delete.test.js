/* @flow */
import assert from "power-assert";
import cookie from "cookie";
import configs from "server/configs";
import AccessToken from "../AccessToken";

test("AccessToken: delete success", async () => {
  const accessToken = new AccessToken(configs);

  const response = await accessToken.delete();
  const cookies = response.meta.headers["set-cookie"];
  const parsedCookie = cookie.parse(cookies);
  assert(parsedCookie["access-token"] === "null");
  assert(parsedCookie.Expires === "Thu, 01 Jan 1970 00:00:00 GMT");
});
