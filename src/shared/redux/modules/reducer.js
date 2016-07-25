import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduxAsyncLoader } from 'redux-async-loader';
import { reducer as formReducer } from 'redux-form';
import alert from './alert';
import auth from './auth';
import masters from './masters';
import style from './style';
import salon from './salon';
import counter from './counter';
import loading from './loading';

export default combineReducers({
  masters,
  auth,
  style,
  salon,
  counter,
  alert,
  loading,
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
});
