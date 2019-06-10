import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  color: string;
  mode: boolean;
  onChangeColor: Function;
  onChangeMode: Function;
};

export default class Canvas extends Component<Props, {}> {
  private canvasRef: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;
  private isPainting: boolean;
  private offset: [
    {
      x: number;
      y: number;
      color: string;
      move: boolean;
    },
  ];

  constructor(props: Props) {
    super(props);
    // init
    this.isPainting = false;
    this.offset = [
      {
        x: 0,
        y: 0,
        color: props.color,
        move: false,
      },
    ];
    // bind
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.canvasCtx = this.canvasRef.getContext(
      "2d",
    ) as CanvasRenderingContext2D;
    // for canvas scaling problem.
    this.canvasRef.height = this.canvasRef.offsetHeight;
    this.canvasRef.width = this.canvasRef.offsetWidth;
  }

  onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    this.isPainting = true;
    this.addOffset(
      e.pageX - this.canvasRef.offsetLeft,
      e.pageY - this.canvasRef.offsetTop,
      false,
    );
    this.draw();
  }

  onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!this.isPainting) {
      return;
    }
    this.addOffset(
      e.pageX - this.canvasRef.offsetLeft,
      e.pageY - this.canvasRef.offsetTop,
      true,
    );
    this.draw();
  }

  onMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    this.isPainting = false;
  }

  onMouseLeave(e: React.MouseEvent<HTMLCanvasElement>) {
    this.isPainting = false;
  }

  private addOffset(x: number, y: number, move: boolean) {
    const { color, mode } = this.props;
    this.offset.push({
      x: x,
      y: y,
      color: mode ? "#fff" : color,
      move: move,
    });
  }

  private draw() {
    // clear
    this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.canvasCtx.lineJoin = "round";
    this.canvasCtx.lineWidth = 5;
    for (var i = 0; i < this.offset.length; i++) {
      this.canvasCtx.beginPath();
      if (this.offset[i].move && i) {
        this.canvasCtx.moveTo(this.offset[i - 1].x, this.offset[i - 1].y);
      } else {
        this.canvasCtx.moveTo(this.offset[i].x, this.offset[i].y);
      }
      this.canvasCtx.lineTo(this.offset[i].x, this.offset[i].y);
      this.canvasCtx.closePath();
      this.canvasCtx.strokeStyle = this.offset[i].color;
      this.canvasCtx.stroke();
    }
  }

  render() {
    const { onChangeColor, onChangeMode } = this.props;
    return (
      <main>
        <DrawArea
          ref={(canvas: HTMLCanvasElement) => {
            this.canvasRef = canvas;
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
        />
        <Palette>
          Color:
          <ColorPicker onChange={onChangeColor as any} />
          Eraser Mode:
          <ModeSelector onChange={onChangeMode as any} />
        </Palette>
      </main>
    );
  }
}

const DrawArea = styled.canvas`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const Palette = styled.div``;

const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 50px;
  height: 20px;
  margin-right: 20px;
`;

const ModeSelector = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
`;
