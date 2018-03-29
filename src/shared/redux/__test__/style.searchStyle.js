/* eslint-disable no-undefined, callback-return */
import Fetchr from "fetchr";
import { test } from "eater/runner";
import assert from "power-assert";
import Immutable from "seamless-immutable";
import { INITIAL_STATE, searchStyle } from "../modules/style";
import { createStore } from "./lib/storeUtils";

let needFailure = false;
Fetchr.registerService({
  name: "style",
  read(req, resource, params, config, cb) {
    return needFailure
      ? cb(new Error("failure"))
      : cb(null, { results_available: "10", style: ["foo", "bar"] });
  }
});

test("style: searchStyle success", () => {
  const searchStyleAction = searchStyle({ query: "foo" });
  const initialState = Immutable({ page: { style: INITIAL_STATE } });
  const store = createStore({
    initialState
  });
  store.dispatch(searchStyleAction).then(() => {
    const state = store.getState().page.style;
    assert.deepEqual(state, {
      loading: false,
      loaded: true,
      params: { query: "foo" },
      count: 10,
      items: ["foo", "bar"]
    });
  });
});

test("style: searchStyle failure", (_, fail) => {
  const searchStyleAction = searchStyle({ query: "foo" });
  const initialState = Immutable({ page: { style: INITIAL_STATE } });
  const store = createStore({
    initialState
  });
  needFailure = true;
  store.dispatch(searchStyleAction).then(fail, () => {
    const state = store.getState().page.style;
    assert.deepEqual(state, {
      loading: false,
      loaded: false,
      params: { query: "foo" },
      count: 0,
      items: [],
      error: true
    });
  });
});
