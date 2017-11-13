import React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';
import { ACCESS_COUNTER } from 'shared/redux/analytics/variableNames';

export default compose(
  sendAnalytics({
    ...siteSections('foo', 'top'),
    onReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [ACCESS_COUNTER]: state.app.counter && state.app.counter.value,
    }),
  }),
  shouldUpdate(() => false),
)(function Foo(props) {
  return (
    <div>Foo!</div>
  );
});
