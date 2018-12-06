/* eslint-disable no-undefined */
import assert from "assert";
import Fetchr from "fetchr";
import { ACCESS_TOKEN_AUDIENCE_NAME } from "../../../server/services/AccessToken";
import { login } from "../modules/auth";
import { createStore, createWithSignedStore } from "./lib/storeUtils";

/**
 * mock accessToken service
 */
Fetchr.registerService({
  name: "accessToken",
  create(req, resource, params, body, config, cb) {
    if (params && params.username === "s") {
      return void cb(new Error("username is short"));
    }

    cb(null, null);
  },
});

test("auth: login success username scott", () => {
  const loginAction = login("scott", "tiger", undefined as any);
  createWithSignedStore("scott", ACCESS_TOKEN_AUDIENCE_NAME, {}).then(store => {
    store.dispatch(loginAction).then(() => {
      assert.deepStrictEqual(store.getState().app.auth, {
        login: true,
        username: "scott",
      });
    });
  });
});

test("auth: login success username foobar", () => {
  const loginAction = login("foobar", "tiger", undefined as any);
  createWithSignedStore("foobar", ACCESS_TOKEN_AUDIENCE_NAME, {}).then(
    store => {
      store.dispatch(loginAction).then(() => {
        assert.deepStrictEqual(store.getState().app.auth, {
          login: true,
          username: "foobar",
        });
      });
    },
  );
});

test("auth: login failure invalid audience name", async done => {
  const loginAction = login("scott", "tiger", undefined as any);
  const store = await createWithSignedStore("scott", "no-such-audience", {});
  try {
    await store.dispatch(loginAction);
    done.fail();
  } catch (e) {
    assert.strictEqual(e.message, "invalid token");
  }
  done();
});

test("auth: login failure username is short", async done => {
  const loginAction = login("s", "tiger", undefined as any);

  const store = createStore({
    cookie: {},
  });

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
