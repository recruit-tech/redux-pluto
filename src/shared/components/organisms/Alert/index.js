import { connect } from 'react-redux';
import { compose } from 'recompose';
import { clearAlert } from '../../../redux/modules/alert';
import bindActionCreators from '../../utils/bindActionCreators';
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
