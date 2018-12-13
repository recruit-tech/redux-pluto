/* eslint-disable no-undefined */
import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";

import { ACCESS_TOKEN_AUDIENCE_NAME } from "../../../server/services/AccessToken";
import { checkLogin } from "../modules/auth";
import { createWithSignedStore, createStore } from "./lib/storeUtils";

/**
 * mock accessToken service
 */
(Fetchr as FetchrStatic).registerService({
  name: "accessToken",
  create(req, resource, params, body, config, cb) {
    cb(null, null);
  },

  delete(req, resource, params, config, cb) {
    cb(null, null);
  },
});

test("auth: checkLogin success", () => {
  const checkLoginAction = checkLogin();
  createWithSignedStore("scott", ACCESS_TOKEN_AUDIENCE_NAME, {}).then(store => {
    store.dispatch(checkLoginAction).then(() => {
      assert.deepStrictEqual(store.getState().app.auth, {
        login: true,
        username: "scott",
      });
    });
  });
});

test("auth: checkLogin failure", done => {
  const checkLoginAction = checkLogin();

  const store = createStore({
    cookie: {},
  });

  store.dispatch(checkLoginAction).then(done.fail, (e: Error) => {
    assert.deepStrictEqual(store.getState().app.auth, {
      login: false,
      username: null,
    });
    assert.strictEqual(e.message, "no token");
    return done();
  });
});
