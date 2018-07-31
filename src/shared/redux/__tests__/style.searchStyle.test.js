/* @flow */
/* eslint-disable no-undefined, callback-return */
import assert from "assert";
import Fetchr from "fetchr";
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
  },
});

test("style: searchStyle success", async () => {
  const searchStyleAction = searchStyle({ query: "foo" });
  const initialState = Immutable({ page: { style: INITIAL_STATE } });
  const store = createStore({
    initialState,
  });
  return store.dispatch(searchStyleAction).then(() => {
    const state = store.getState().page.style;
    assert.deepStrictEqual(state, {
      loading: false,
      loaded: true,
      params: { query: "foo" },
      count: 10,
      items: ["foo", "bar"],
    });
  });
});

test("style: searchStyle failure", done => {
  const searchStyleAction = searchStyle({ query: "foo" });
  const initialState = Immutable({ page: { style: INITIAL_STATE } });
  const store = createStore({
    initialState,
  });
  needFailure = true;
  store.dispatch(searchStyleAction).then(done.fail, () => {
    const state = store.getState().page.style;
    assert.deepStrictEqual(state, {
      loading: false,
      loaded: false,
      params: { query: "foo" },
      count: 0,
      items: [],
      error: true,
    });
    done();
  });
});
