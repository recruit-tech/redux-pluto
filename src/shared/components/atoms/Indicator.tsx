
import React from "react";
import pure from "recompose/pure";
import styled from "styled-components";

export const Loader = styled.div`
  position: absolute;
  margin: -15 0 0 -15;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 8px solid #17cddd;
  border-right-color: transparent;
  animation: spin 0.5s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type Props = {
  loading: boolean,
};

export default pure(function Indicator(props: Props) {
  const { loading } = props;
  if (!loading) {
    return null;
  }

  return <Loader />;
});
