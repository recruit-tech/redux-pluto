/* eslint-disable no-undefined */
import { test } from "eater/runner";
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
  }
});

const store = createStore({ cookie: {} });

test("agreedSample: getText success", () => {
  store.dispatch(getText()).then(() => {
    assert.deepEqual(store.getState().page.agreedSample, {
      text: "Hello world",
      loading: false,
      loaded: true
    });
  });
});

test("agreedSample: getText failure", (_, fail) => {
  needFailure = true;
  store.dispatch(getText()).then(fail, () => {
    assert.deepEqual(store.getState().page.agreedSample, {
      text: "",
      error: true,
      loading: false,
      loaded: false
    });
  });
});
