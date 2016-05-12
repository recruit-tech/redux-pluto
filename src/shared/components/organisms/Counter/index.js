import { connect } from 'react-redux';
import { compose } from 'recompose';
import { increment } from '../../../redux/modules/counter';
import { deferLoader } from '../../../packages/redux-async-loader';
import Counter from './Counter';

export default compose(
  deferLoader(({ props, store: { dispatch } }) => dispatch(increment())),
  connect(
    (state) => ({
      counterValue: state.counter.value,
    })
  ),
)(Counter);
