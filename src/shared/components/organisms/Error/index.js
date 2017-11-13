import React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';
import { siteSections } from 'shared/redux/analytics/utils';

export default compose(
  sendAnalytics({
    ...siteSections('error', 'error'),
  }),
  shouldUpdate(() => false),
)(function Error(props) {
  return (
    <div>Error!</div>
  );
});
