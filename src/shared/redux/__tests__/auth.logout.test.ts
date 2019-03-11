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
  username: null,
  read(req, resource, params, config, cb) {
    cb(null, {
      sub: this.username,
    });
  },

  create(req, resource, params, body, config, cb) {
    const { username } = params;
    this.username = username;
    cb(null, {
      username,
    });
  },

  delete(req, resource, params, config, cb) {
    this.username = null;
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
