import { connect } from 'react-redux';
import { asyncLoader } from 'redux-async-loader';
import { compose } from 'recompose';
import { getText } from 'shared/redux/modules/agreedSample';
import AgreedSample from './AgreedSample';

export default compose(
  asyncLoader((_, { dispatch }) => dispatch(getText())),
  connect((state) => ({
    text: state.page.agreedSample.text,
  })),
)(AgreedSample);
