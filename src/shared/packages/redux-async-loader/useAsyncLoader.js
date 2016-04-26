import React from 'react';
import ReduxAsyncLoaderContext from './ReduxAsyncLoaderContext';

export default function useAsyncLoader() {
  return {
    renderRouterContext: (child, renderProps) => (
      <ReduxAsyncLoaderContext {...renderProps}>{child}</ReduxAsyncLoaderContext>
    ),
  };
}
