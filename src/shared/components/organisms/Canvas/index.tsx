import { connect } from "react-redux";
import { compose, shouldUpdate } from "recompose";
import { State as CanvasState } from "../../../redux/modules/canvas";
import { canvasSelector } from "../../../redux/modules/reducer";
import { RootState } from "../../../../shared/redux/modules/reducer";
import Canvas from "./Canvas";

export default compose<CanvasState, {}>(
  shouldUpdate(() => false),
  connect((state: RootState) => ({
    color: canvasSelector(state).color,
    mode: canvasSelector(state).mode,
  }))
)(Canvas);