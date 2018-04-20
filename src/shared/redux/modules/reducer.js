/* @flow */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reduxAsyncLoader } from "redux-async-loader";

export type State = {
  app: {
  },
  reduxAsyncLoader: *,
  routing: *,
};

export default combineReducers({
  app: {},
  reduxAsyncLoader,
  routing: routerReducer,
});

