import compose, { checkLogin, login, logout } from '../auth';
import {test} from 'eater/runner';
import assert from 'power-assert';
import {mockStore, registerService} from './storeUtil';

test('Action: checkLogin', (done) => {
  const checkLoginAction = checkLogin();
  assert(checkLoginAction.type === 'EFFECT_COMPOSE');
  assert.deepEqual(checkLoginAction.payload, {
    type: "redux-proto/auth/check/request",
    payload: undefined
  });
  const steps = checkLoginAction.meta.steps[0];
  assert.deepEqual(steps[0](), {
    type: 'redux-proto/auth/check/success', 
    payload: undefined
  });
  assert.deepEqual(steps[1](), {
    type: 'redux-proto/auth/check/fail', 
    payload: undefined
  });
  done();
});

test('Action: login', (done) => {
  const loginAction = login('foo', 'bar', 'buz');
  assert(loginAction.type === 'EFFECT_COMPOSE');
  assert.deepEqual(loginAction.payload, { 
    type: 'redux-proto/auth/login/request', 
    payload: { 
      params: { 
        username: 'foo', 
        password: 'bar' 
      }, 
      location: 'buz' 
    } 
  });
  const steps = loginAction.meta.steps[0];
  assert.deepEqual(steps[0](), {
    type: 'redux-proto/auth/login/success', 
    payload: undefined
  });
  assert.deepEqual(steps[1](), {
    type: 'redux-proto/auth/login/fail', 
    payload: undefined
  });
  done();
});

test('Action: logout', (done) => {
  const logoutAction = logout();
  assert(logoutAction.type === 'EFFECT_COMPOSE');
  assert.deepEqual(logoutAction.payload, { 
    type: 'redux-proto/auth/logout/request', 
    payload: undefined 
  });
  const steps = logoutAction.meta.steps[0];
  assert.deepEqual(steps[0](), {
    type: 'redux-proto/auth/logout/success', 
    payload: undefined
  });
  assert.deepEqual(steps[1](), {
    type: 'redux-proto/auth/logout/fail', 
    payload: undefined
  });
  done();
});

test('State: checkLoginSuccess', (done) => {
  const checkLoginAction = checkLogin();
  const steps = checkLoginAction.meta.steps[0];
  const INITIAL_STATE = {
    login: false,
    username: null,
  };
  const checkLoginSuccess = steps[0];
  const state = compose(INITIAL_STATE, checkLoginSuccess({
    sub: 'haruka'
  }));
  assert.deepEqual(state, {
    login: true,
    username: 'haruka'
  });
  done();
});

test('State: checkLoginFail', (done) => {
  const checkLoginAction = checkLogin();
  const steps = checkLoginAction.meta.steps[0];
  const INITIAL_STATE = {
    login: true,
    username: 'haruka',
  };
  const checkLoginFail = steps[1];
  const state = compose(INITIAL_STATE, checkLoginFail());
  assert.deepEqual(state, {
    login: false,
    username: null,
  });
  done();
});

test('State: loginSuccess', (done) => {
  const loginAction = login('foo', 'bar', 'buz');
  const steps = loginAction.meta.steps[0];
  const INITIAL_STATE = {
    login: false,
    username: null,
  };
  const loginSuccessAction = steps[0];
  const state = compose(INITIAL_STATE, loginSuccessAction({
    sub: 'haruka' 
  }));
  assert.deepEqual(state, {
    login: true,
    username: 'haruka'
  });
  done();
});

test('State: loginFail', (done) => {
  const loginAction = login('foo', 'bar', 'buz');
  const steps = loginAction.meta.steps[0];
  const INITIAL_STATE = {
    login: true,
    username: 'haruka'
  };
  const loginFailAction = steps[1];
  const state = compose(INITIAL_STATE, loginFailAction());
  assert.deepEqual(state, {
    login: false,
    username: undefined
  });
  done();
});

test('State: logoutSuccess', (done) => {
  const logoutAction = logout();
  const steps = logoutAction.meta.steps[0];
  const INITIAL_STATE = {
    login: true,
    username: 'haruka'
  };
  const logoutSuccessAction = steps[0];
  const state = compose(INITIAL_STATE, logoutSuccessAction());
  assert.deepEqual(state, {
    login: false,
    username: undefined
  });
  done();
});

test('State: logoutFail', (done) => {
  const logoutAction = logout();
  const steps = logoutAction.meta.steps[0];
  const INITIAL_STATE = {
    login: true,
    username: 'haruka'
  };
  const logoutFailAction = steps[1];
  const state = compose(INITIAL_STATE, logoutFailAction());
  assert.deepEqual(state, INITIAL_STATE);
  done();
});

test('Store: login', (done) => {
  const loginAction = login('foo', 'bar', 'buz');
  const INITIAL_STATE = {
    login: false,
    username: null,
  };
  registerService({
    name: 'accessToken',
    create: function(req, resource, params, body, config, cb) {
      cb(null, {sub: params.username} );
    },
  });
  const store = mockStore(INITIAL_STATE);

  store.dispatch(loginAction).then(() => {
    const actions = store.getActions();
    const isSuccess = actions.some((action) => {
      console.log(action);
      return action.type === 'redux-proto/auth/login/success' && 
        action.payload.data.sub === 'foo';
    });
    assert.ok(isSuccess);
  }).then(done);
});
