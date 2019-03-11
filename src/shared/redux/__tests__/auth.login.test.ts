/* eslint-disable no-undefined */
import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";
import { login } from "../modules/auth";
import { createStore } from "./lib/storeUtils";

/**
 * mock accessToken service
 */
(Fetchr as FetchrStatic).registerService({
  name: "accessToken",
  create(req, resource, params, body, config, cb) {
    if (params && params.username === "s") {
      return void cb(new Error("username is short"));
    }

    cb(null, {
      username: params.username,
    });
  },
});

test("auth: login success username scott", () => {
  const loginAction = login("scott", "tiger", undefined as any);
  const store = createStore({});
  store.dispatch(loginAction).then(() => {
    assert.deepStrictEqual(store.getState().app.auth, {
      login: true,
      username: "scott",
    });
  });
});

test("auth: login success username foobar", () => {
  const loginAction = login("foobar", "tiger", undefined as any);
  const store = createStore({});
  store.dispatch(loginAction).then(() => {
    assert.deepStrictEqual(store.getState().app.auth, {
      login: true,
      username: "foobar",
    });
  });
});

test("auth: login failure username is short", async done => {
  const loginAction = login("s", "tiger", undefined as any);

  const store = createStore({});

  try {
    await store.dispatch(loginAction);
    done.fail();
  } catch (e) {
    assert.deepStrictEqual(store.getState().app.auth, {
      login: false,
      username: null,
    });
    assert(e);
  }

  done();
});
