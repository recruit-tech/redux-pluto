
import { connect } from "react-redux";
import { compose } from "recompose";
import { alertSelector } from "../../../redux/modules/reducer";
import { clearAlert } from "../../../redux/modules/alert";
import bindActionCreators from "../../utils/bindActionCreators";
import Alert from "./Alert";

export default compose(
  connect(
    state => ({
      alert: alertSelector(state as any),
    }),
    bindActionCreators({
      onClose: clearAlert,
    }),
  ),
)(Alert);
