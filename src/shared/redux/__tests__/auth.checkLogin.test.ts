/* eslint-disable no-undefined */
import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";

import { login, checkLogin, logout } from "../modules/auth";
import { createStore } from "./lib/storeUtils";

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

test("auth: checkLogin after login", async () => {
  const loginAction = login("scott", "tiger", undefined as any);
  const checkLoginAction = checkLogin();
  const store = createStore({});
  await store.dispatch(loginAction);
  await store.dispatch(checkLoginAction);
  assert.deepStrictEqual(store.getState().app.auth, {
    login: true,
    username: "scott",
  });
});

test("auth: checkLogin after logout", async () => {
  const logoutAction = logout();
  const checkLoginAction = checkLogin();
  const store = createStore({});
  await store.dispatch(logoutAction);
  await store.dispatch(checkLoginAction);
  assert.deepStrictEqual(store.getState().app.auth, {
    login: false,
    username: null,
  });
});
