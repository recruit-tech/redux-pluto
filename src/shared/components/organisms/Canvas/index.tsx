import { connect } from "react-redux";
import { canvasSelector } from "../../../redux/modules/reducer";
import { RootState } from "../../../../shared/redux/modules/reducer";
import { changeColor, changeMode } from "../../../redux/modules/canvas";
import Canvas from "./Canvas";

export default connect(
  (state: RootState) => ({
    color: canvasSelector(state).color,
    mode: canvasSelector(state).mode,
  }),
  dispatch => ({
    onChangeColor: (e: any) => {
      dispatch(changeColor(e.target.value));
    },
    onChangeMode: (e: any) => {
      dispatch(changeMode(e.target.checked));
    },
  }),
)(Canvas);
