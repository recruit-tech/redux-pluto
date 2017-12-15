import { connect } from 'react-redux';
import { asyncLoader } from 'redux-async-loader';
import { compose } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';
import { getText } from 'shared/redux/modules/agreedSample';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';
import AgreedSample from './AgreedSample';

export default compose(
  asyncLoader((_, { dispatch }) => dispatch(getText())),
  connect((state) => ({
    text: state.page.agreedSample.text,
  })),
  sendAnalytics({
    ...siteSections('agreedsample', 'top'),
    onDataReady: onAsyncLoaderLoaded,
  }),
)(AgreedSample);
