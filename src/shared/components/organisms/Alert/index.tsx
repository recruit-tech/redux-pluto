import { connect } from "react-redux";
import { alertSelector, RootState } from "../../../redux/modules/reducer";
import { clearAlert } from "../../../redux/modules/alert";
import bindActionCreators from "../../utils/bindActionCreators";
import Alert, { Props, Handlers } from "./Alert";

const enhancer = connect<Props, Handlers, {}, RootState>(
  state => ({
    alert: alertSelector(state),
  }),
  bindActionCreators({
    onClose: clearAlert,
  }),
);

export default enhancer(Alert);
