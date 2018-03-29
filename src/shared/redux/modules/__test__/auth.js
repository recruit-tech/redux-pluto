/* eslint-disable no-undefined */
import { test } from "eater/runner";
import assert from "power-assert";
import Immutable from "seamless-immutable";
import reducer, { checkLogin, login, logout } from "../auth";

test("State: checkLoginSuccess", done => {
  const checkLoginAction = checkLogin();
  const steps = checkLoginAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: false,
    username: null
  });
  const checkLoginSuccess = steps[0];
  const state = reducer(
    INITIAL_STATE,
    checkLoginSuccess({
      sub: "haruka"
    })
  );
  assert.deepEqual(state, {
    login: true,
    username: "haruka"
  });
  done();
});

test("State: checkLoginFail", done => {
  const checkLoginAction = checkLogin();
  const steps = checkLoginAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: true,
    username: "haruka"
  });
  const checkLoginFail = steps[1];
  const state = reducer(INITIAL_STATE, checkLoginFail());
  assert.deepEqual(state, {
    login: false,
    username: null
  });
  done();
});

test("State: loginSuccess", done => {
  const loginAction = login("foo", "bar", "buz");
  const steps = loginAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: false,
    username: null
  });
  const loginSuccessAction = steps[0];
  const state = reducer(
    INITIAL_STATE,
    loginSuccessAction({
      sub: "haruka"
    })
  );
  assert.deepEqual(state, {
    login: true,
    username: "haruka"
  });
  done();
});

test("State: loginFail", done => {
  const loginAction = login("foo", "bar", "buz");
  const steps = loginAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: true,
    username: "haruka"
  });
  const loginFailAction = steps[1];
  const state = reducer(INITIAL_STATE, loginFailAction());
  assert.deepEqual(state, {
    login: false,
    username: undefined
  });
  done();
});

test("State: logoutSuccess", done => {
  const logoutAction = logout();
  const steps = logoutAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: true,
    username: "haruka"
  });
  const logoutSuccessAction = steps[0];
  const state = reducer(INITIAL_STATE, logoutSuccessAction());
  assert.deepEqual(state, {
    login: false,
    username: undefined
  });
  done();
});

test("State: logoutFail", done => {
  const logoutAction = logout();
  const steps = logoutAction.meta.steps[0];
  const INITIAL_STATE = Immutable({
    login: true,
    username: "haruka"
  });
  const logoutFailAction = steps[1];
  const state = reducer(INITIAL_STATE, logoutFailAction());
  assert.deepEqual(state, INITIAL_STATE);
  done();
});
