import { connect } from "react-redux";
import { compose } from "recompose";
import { deferLoader } from "redux-async-loader";
import { counterSelector } from "../../../redux/modules/reducer";
import { increment } from "../../../redux/modules/counter";
import Counter from "./Counter";

export default compose<{ counterValue: number }, {}>(
  deferLoader((_props, { dispatch }) => dispatch(increment())),
  connect(state => ({
    counterValue: counterSelector(state as any).value,
  })),
)(Counter);
