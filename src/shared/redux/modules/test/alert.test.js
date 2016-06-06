import compose, {showAlert, clearAlert} from '../alert';
import {test} from 'eater/runner';
import assert from 'power-assert';

test('Action: showAlert', (done) => {
  const showAlertAction = showAlert('test');
  assert.deepEqual(showAlertAction, { 
    type: 'redux-proto/app/alert/show',
    payload: 'test'
  });
  done();
});

test('Action: clearAlert', (done) => {
  const clearAlertAction = clearAlert();
  assert.deepEqual(clearAlertAction, { 
    type: 'redux-proto/app/alert/clear',
    payload: undefined
  });
  done();
});

test('State: showAlert', (done) => {
  const showAlertAction = showAlert('test');
  const state = compose({ message: '' }, showAlertAction);
  assert.deepEqual(state, {
    message: 'test'
  });
  done();
});


test('State: clearAlert', (done) => {
  const clearAlertAction = clearAlert();
  const state = compose({ message: 'test' }, clearAlertAction);
  assert.deepEqual(state, {
    message: ''
  });
  done();
});
