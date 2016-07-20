import { connect } from 'react-redux';
import { compose } from 'recompose';
import GlobalIndicator from './GlobalIndicator';

export default compose(
  connect(
    (state) => ({
      loading: state.loading,
    })
  ),
)(GlobalIndicator);
