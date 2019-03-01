import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";
import { getText } from "../modules/agreedSample";
import { createStore } from "./lib/storeUtils";

let needFailure: any = null;
(Fetchr as FetchrStatic).registerService({
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
  assert.deepStrictEqual(store.getState().app.agreedSample, {
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
    assert.deepStrictEqual(store.getState().app.agreedSample, {
      text: "",
      error: true,
      loading: false,
      loaded: false,
    });
    done();
  }
});
