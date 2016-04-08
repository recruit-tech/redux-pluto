import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import masters from './masters';
import style from './style';

export default combineReducers({
  masters,
  style,
  reduxAsyncConnect,
  routing: routerReducer,
});
