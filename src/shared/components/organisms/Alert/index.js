import { connect } from 'react-redux';
import { compose } from 'recompose';
import { clearAlert } from 'shared/redux/modules/alert';
import bindActionCreators from 'shared/components/utils/bindActionCreators';
import Alert from './Alert';

export default compose(
  connect(
    (state) => ({
      alert: state.app.alert,
    }),
    bindActionCreators({
      onClose: clearAlert,
    }),
  ),
)(Alert);
