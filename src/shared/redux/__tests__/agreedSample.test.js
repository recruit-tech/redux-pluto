/* eslint-disable no-undefined */
import Fetchr from "fetchr";
import assert from "power-assert";
import { getText } from "../modules/agreedSample";
import { createStore } from "./lib/storeUtils";

let needFailure = null;
Fetchr.registerService({
  name: "agreedSample",
  read(req, resource, params, config, cb) {
    return needFailure
      ? cb(new Error("failure"))
      : cb(needFailure, { text: "Hello world" });
  },
});

test("agreedSample: getText success", async () => {
  const store = createStore({ cookie: {} });
  await store.dispatch(getText());
  assert.deepEqual(store.getState().page.agreedSample, {
    text: "Hello world",
    loading: false,
    loaded: true,
  });
});

test("agreedSample: getText failure", async done => {
  const store = createStore({ cookie: {} });
  needFailure = true;
  try {
    await store.dispatch(getText());
    done.fail();
  } catch (_e) {
    assert.deepEqual(store.getState().page.agreedSample, {
      text: "",
      error: true,
      loading: false,
      loaded: false,
    });
    done();
  }
});
