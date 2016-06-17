/* eslint-disable no-undefined */
import reducer, { showAlert, clearAlert } from '../alert';
import { test } from 'eater/runner';
import assert from 'power-assert';
import Immutable from 'seamless-immutable';

test('State: showAlert', (done) => {
  const showAlertAction = showAlert('test');
  const INITIAL_STATE = Immutable({
    message: '',
  });
  const state = reducer(INITIAL_STATE, showAlertAction);
  assert.deepEqual(state, {
    message: 'test',
  });
  done();
});

test('State: clearAlert', (done) => {
  const clearAlertAction = clearAlert();
  const INITIAL_STATE = Immutable({
    message: 'test',
  });
  const state = reducer(INITIAL_STATE, clearAlertAction);
  assert.deepEqual(state, {
    message: '',
  });
  done();
});
