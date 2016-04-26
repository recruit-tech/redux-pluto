import React from 'react';
import ScrollBehaviorContext from './ScrollBehaviorContext';

export default function useScrollBehavior() {
  return {
    renderRouterContext: (child, renderProps) => (
      <ScrollBehaviorContext {...renderProps}>{child}</ScrollBehaviorContext>
    ),
  };
}
