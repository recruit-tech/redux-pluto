import React from "react";
import { ReactReduxContext } from "react-redux";
import ReduxAsyncLoaderContext from "./ReduxAsyncLoaderContext";

const WrapedReduxAsyncLoaderContext = ({ child, renderProps }) => (
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <ReduxAsyncLoaderContext {...renderProps} ctx={{ store }}>
        {child}
      </ReduxAsyncLoaderContext>
    )}
  </ReactReduxContext.Consumer>
);

export default function useAsyncLoader() {
  return {
    renderRouterContext: (child, renderProps) => (
      <WrapedReduxAsyncLoaderContext child={child} renderProps={renderProps} />
    ),
  };
}
