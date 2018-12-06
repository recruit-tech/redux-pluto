import assert from "assert";
import reducer, { startLoading, stopLoading } from "../loading";

test("loading: startLoading success", done => {
  const startLoadingAction = startLoading();
  const state = reducer(false, startLoadingAction);
  assert.strictEqual(state, true);
  done();
});

test("loading: stopLoading success", done => {
  const stopLoadingAction = stopLoading();
  const state = reducer(true, stopLoadingAction);
  assert.strictEqual(state, false);
  done();
});

test("loading: stopLoading success", done => {
  const stopLoadingAction = stopLoading();
  const state = reducer(false, stopLoadingAction);
  assert.strictEqual(state, false);
  done();
});
