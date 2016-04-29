import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncLoader } from '../../packages/redux-async-loader';
import { reducer as formReducer } from 'redux-form';
import masters from './masters';
import style from './style';
import counter from './counter';

export default combineReducers({
  masters,
  style,
  counter,
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
});
