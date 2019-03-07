import React from "react";
import { connect } from "react-redux";
import { compose, shouldUpdate } from "recompose";
import { State as CanvasState } from "../../../redux/modules/canvas";
import { RootState } from "../../../../shared/redux/modules/reducer";

type Props = {
  color: string;
  mode: number;
};

export default compose<CanvasState, {}>(
  shouldUpdate(() => false),
  connect((state: RootState) => ({
    color: state.page.canvas.color,
    mode: state.page.canvas.mode,
  }))
)(function Canvas(props: Props) {
  return <div>{props.color}</div>;
});