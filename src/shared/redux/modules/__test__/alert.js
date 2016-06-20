/* eslint-disable no-undefined */
import reducer, { showAlert, clearAlert } from '../alert';
import { test } from 'eater/runner';
import assert from 'power-assert';
import Immutable from 'seamless-immutable';

test('State: showAlert', (done) => {
  const showAlertAction = showAlert('test');
  const state = reducer(Immutable({ message: '' }), showAlertAction);
  assert.deepEqual(state, {
    message: 'test',
  });
  done();
});

test('State: clearAlert', (done) => {
  const clearAlertAction = clearAlert();
  const state = reducer(Immutable({ message: 'test' }), clearAlertAction);
  assert.deepEqual(state, {
    message: '',
  });
  done();
});
