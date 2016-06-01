import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncLoader } from '../../packages/redux-async-loader';
import { reducer as formReducer } from 'redux-form';
import alert from './alert';
import auth from './auth';
import masters from './masters';
import style from './style';
import counter from './counter';
import loading from './loading';

export default combineReducers({
  masters,
  auth,
  style,
  counter,
  alert,
  loading,
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
});
