import assert from "assert";
import { createAsyncActionTypes } from "../utils";

test("createAsyncActionTypes", done => {
  const actionTypes = createAsyncActionTypes("app/fetch");
  assert.deepStrictEqual(actionTypes, [
    "app/fetch/request",
    "app/fetch/success",
    "app/fetch/fail",
  ]);
  done();
});
