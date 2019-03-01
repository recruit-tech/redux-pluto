/* eslint-disable no-undefined */
import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";

import { ACCESS_TOKEN_AUDIENCE_NAME } from "../../../server/services/AccessToken";
import { login, logout } from "../modules/auth";
import { createWithSignedStore } from "./lib/storeUtils";

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

test("auth: logout success", done => {
  const logoutAction = logout();
  createWithSignedStore("scott", ACCESS_TOKEN_AUDIENCE_NAME, {}).then(store => {
    store.dispatch(logoutAction).then(() => {
      assert.deepStrictEqual(store.getState().app.auth, {
        login: false,
        username: null,
      });
      done();
    });
  });
});

test("auth: logout success when not logged in", done => {
  const loginAction = login("foobar", "tiger", undefined as any);
  const logoutAction = logout();
  createWithSignedStore("foobar", ACCESS_TOKEN_AUDIENCE_NAME, {}).then(
    store => {
      store
        .dispatch(loginAction)
        .then(() => {
          assert.deepStrictEqual(store.getState().app.auth, {
            login: true,
            username: "foobar",
          });
          return store.dispatch(logoutAction);
        })
        .then(() => {
          assert.deepStrictEqual(store.getState().app.auth, {
            login: false,
            username: null,
          });
          done();
        });
    },
  );
});
