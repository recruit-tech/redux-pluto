import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import ReduxAsyncLoaderContext from "./ReduxAsyncLoaderContext";
import reducer from "./reducer";
import * as names from "./names";
import { Context } from "./context";

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
    renderRouterContext: (child, renderProps) => {
      return (
        <WrapedReduxAsyncLoaderContext
          child={child}
          renderProps={renderProps}
        />
      );
    },
  };
}
