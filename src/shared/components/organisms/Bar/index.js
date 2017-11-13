import React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { range } from 'lodash/fp';
import { sendAnalytics } from 'react-redux-analytics';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';

const array = range(0, 500);

export default compose(
  sendAnalytics({
    ...siteSections('bar', 'top'),
    onReady: onAsyncLoaderLoaded,
  }),
  shouldUpdate(() => false),
)(function Bar(props) {
  return (
    <main>
      {array.map((elm) => (
        <div key={elm}>Bar![{elm}]</div>
      ))}
    </main>
  );
});
