import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  color: string;
  mode: boolean;
  onChangeColor: Function;
  onChangeMode: Function;
};

type State = {
  isPainting: boolean;
  offset: [{
    x: number;
    y: number;
    color: string;
    move: boolean;
  }];
}

export default class Canvas extends Component<Props, State> {

  private canvasRef: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;

  state: State;

  constructor(props : Props){
    super(props);
    this.state = {
      isPainting: false,
      offset: [{
        x: 0,
        y: 0,
        color: props.color,
        move: false,
      }]
    };
  }

  shouldComponentUpdate = (nextProps: Props, nextState: State) => {
    return false;
  }

  componentDidMount = () => {
    this.canvasCtx = this.canvasRef.getContext('2d') as CanvasRenderingContext2D;
    // for canvas scaling problem.
    this.canvasRef.height = this.canvasRef.offsetHeight;
    this.canvasRef.width = this.canvasRef.offsetWidth;
  }

  onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.state.isPainting = true;
    this.addOffset(e.pageX - this.canvasRef.offsetLeft, e.pageY - this.canvasRef.offsetTop, false);
    this.draw();
  }

  onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!this.state.isPainting) {
      return;
    }
    this.addOffset(e.pageX - this.canvasRef.offsetLeft, e.pageY - this.canvasRef.offsetTop, true);
    this.draw();
  }

  onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.state.isPainting = false;
  }

  onMouseLeave = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.state.isPainting = false;
  }

  private addOffset = (x: number, y: number, move: boolean) => {
    const { color, mode } = this.props;
    this.state.offset.push({
      x: x,
      y: y,
      color: mode ? "#fff" : color,
      move: move
    });
  }

  private draw = () => {
    // clear
    this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.canvasCtx.lineJoin = 'round';
    this.canvasCtx.lineWidth = 5;
    for (var i = 0; i < this.state.offset.length; i++) {
      this.canvasCtx.beginPath();
      if (this.state.offset[i].move && i) {
        this.canvasCtx.moveTo(this.state.offset[i - 1].x, this.state.offset[i - 1].y);
      } else {
        this.canvasCtx.moveTo(this.state.offset[i].x, this.state.offset[i].y);
      }
      this.canvasCtx.lineTo(this.state.offset[i].x, this.state.offset[i].y);
      this.canvasCtx.closePath();
      this.canvasCtx.strokeStyle = this.state.offset[i].color;
      this.canvasCtx.stroke();
    }
  }

  render = () => {
    const { onChangeColor, onChangeMode } = this.props;
    return (
      <main>
        <DrawArea 
          ref={(canvas: HTMLCanvasElement) => { this.canvasRef = canvas } }
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
        />
        <Palette>
          Color: 
          <ColorPicker onChange={onChangeColor as any}/>
          Eraser Mode:
          <ModeSelector onChange={onChangeMode as any}/>
        </Palette>
      </main>
    )
  }
}

const DrawArea = styled.canvas`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const Palette = styled.div``;

const ColorPicker = styled.input.attrs({ type: 'color' })`
  width: 50px;
  height: 20px;
  margin-right: 20px;
`;

const ModeSelector = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
`;