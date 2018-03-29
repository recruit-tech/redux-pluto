import { connect } from "react-redux";
import { compose } from "recompose";
import { deferLoader } from "redux-async-loader";
import { counterSelector } from "shared/redux/modules/reducer";
import { increment } from "shared/redux/modules/counter";
import Counter from "./Counter";

export default compose(
  deferLoader((props, { dispatch }) => dispatch(increment())),
  connect(state => ({
    counterValue: counterSelector(state).value
  }))
)(Counter);
