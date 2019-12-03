import { compose } from "redux";
import { connect } from "react-redux";
import { deferLoader } from "@recruit-tech/redux-async-loader";
import { counterSelector } from "../../../redux/modules/reducer";
import { increment } from "../../../redux/modules/counter";
import Counter from "./Counter";

export default compose(
  deferLoader((_props, { dispatch }) => dispatch(increment())),
  connect(state => ({
    counterValue: counterSelector(state as any).value,
  })),
)(Counter);
