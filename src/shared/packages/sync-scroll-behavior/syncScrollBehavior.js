import React from 'react';
import ScrollBehaviorContext from './ScrollBehaviorContext';

export default function syncScrollBehavior() {
  return {
    renderRouterContext: (child, renderProps) => (
      <ScrollBehaviorContext {...renderProps}>{child}</ScrollBehaviorContext>
    ),
  };
}
