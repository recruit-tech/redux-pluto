import { connect } from 'react-redux';
import { compose } from 'recompose';
import { deferLoader } from 'redux-async-loader';
import { increment } from '../../../redux/modules/counter';
import Counter from './Counter';

export default compose(
  deferLoader(
    (props, { dispatch }) => dispatch(increment())
  ),
  connect(
    (state) => ({
      counterValue: state.app.counter.value,
    })
  ),
)(Counter);
