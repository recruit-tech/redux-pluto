import assert from "assert";
import Immutable from "seamless-immutable";
import reducer, { showAlert, clearAlert } from "../alert";

test("State: showAlert", done => {
  const showAlertAction = showAlert("test");
  const INITIAL_STATE = Immutable({
    message: "",
  });
  const state = reducer(INITIAL_STATE, showAlertAction);
  assert.deepStrictEqual(state, {
    message: "test",
  });
  done();
});

test("State: clearAlert", done => {
  const clearAlertAction = clearAlert();
  const INITIAL_STATE = Immutable({
    message: "test",
  });
  const state = reducer(INITIAL_STATE, clearAlertAction);
  assert.deepStrictEqual(state, {
    message: "",
  });
  done();
});
