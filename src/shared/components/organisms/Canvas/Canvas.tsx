import React from "react";
import styled from "styled-components";

type Props = {
  color: string;
  mode: number;
};

export default function Canvas(props: Props) {
  const { color, mode } = props;
  return (
    <main>
      <DrawArea/>
      <Palette>
        Color: 
        <ColorPicker/>
        Eraser Mode:
        <ModeSelector/>
      </Palette>
    </main>
  );
}

const DrawArea = styled.canvas`
  position: relative;
  width: 400px;
  height: 400px;
`;

const Palette = styled.div`
`;

const ColorPicker = styled.input.attrs({ type: 'color' })`
  width: 50px;
  height: 20px;
  margin-right: 20px;
`;

const ModeSelector = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
`;