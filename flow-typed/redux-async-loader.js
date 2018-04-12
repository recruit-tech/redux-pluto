import { type HOC } from 'recompose'
import { type MiddlewareAPI } from 'redux'
declare module 'redux-async-loader' {
  declare var useAsyncLoader: any;
  declare var reduxAsyncLoader: {
    onServer: boolean,
    loaded: boolean
  };
  declare function asyncLoader<P, R>(
    (P, MiddlewareAPI<*, *>) => HOC<R, P>
  ): HOC<R, P>;
}
