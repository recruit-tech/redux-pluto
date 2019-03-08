import React from "react";

type Props = {
  color: string;
  mode: number;
};

export default function Canvas(props: Props) {
  const { color, mode } = props;
  return (
    <div>
      <div>{color}</div>
      <div>{mode}</div>
    </div>
  );
}