import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  color: string;
  mode: number;
};

export default class Canvas extends Component<Props, {}> {

  private canvas: HTMLCanvasElement;
  private ctx: RenderingContext;

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d') as RenderingContext;
  }

  render() {
    const { color, mode } = this.props;
    return (
      <main>
        <DrawArea ref={(canvas: HTMLCanvasElement) => { this.canvas = canvas } }/>
        <Palette>
          Color: 
          <ColorPicker/>
          Eraser Mode:
          <ModeSelector/>
          <div>{color}</div>
          <div>{mode}</div>
        </Palette>
      </main>
    )
  }
}

const DrawArea = styled.canvas`
  position: relative;
  width: 400px;
  height: 400px;
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