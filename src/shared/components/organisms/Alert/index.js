/* @flow */
import { connect } from "react-redux";
import { compose } from "recompose";
import { alertSelector } from "shared/redux/modules/reducer";
import { clearAlert } from "shared/redux/modules/alert";
import bindActionCreators from "shared/components/utils/bindActionCreators";
import Alert from "./Alert";

export default compose(
  connect(
    state => ({
      alert: alertSelector(state),
    }),
    bindActionCreators({
      onClose: clearAlert,
    }),
  ),
)(Alert);
