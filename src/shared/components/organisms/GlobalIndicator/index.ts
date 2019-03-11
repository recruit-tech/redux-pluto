import { connect } from "react-redux";
import { loadingSelector } from "../../../redux/modules/reducer";
import GlobalIndicator from "./GlobalIndicator";

const enhancer = connect(state => ({
  loading: loadingSelector(state as any),
}));

export default enhancer(GlobalIndicator);
