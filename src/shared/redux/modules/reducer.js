import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';
import masters from './masters';
import style from './style';

export default combineReducers({
  masters,
  style,
  form: formReducer,
  reduxAsyncConnect,
  routing: routerReducer,
});
