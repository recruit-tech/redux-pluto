/* @flow */
import React from "react";
import { type Store } from "redux";
import { Provider } from "react-redux";
import RouterContext from "react-router/lib/RouterContext";
import { createGlobalStyle } from "styled-components";
import { type State } from "../../shared/redux/modules/reducer";

/* eslint no-unused-expressions: 0 */
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: verdana, sans-serif;
    line-height: 1.5;
  }

  h1 {
    font-size: 48px;
    line-height: 1;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 36px;
    line-height: calc(48 / 36);
    margin-bottom: 24px;
  }

  h3 {
    font-size: 24px;
    line-height: 1;
    margin-bottom: 24px;
  }

  hgroup h2, h4, h5, h6 {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 24px;
  }

  a {
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    vertical-align: middle;
  }

  .u-invalidLocalName {
    border-color: red !important;
    border-width: 10px !important;
    border-style: solid !important;
    padding: 10px !important;
    background-color: red !important;
  }
`;

type Props = {
  store: Store<State, *>,
};

export default function App(props: Props) {
  const { store, ...renderProps } = props;

  return (
    <React.Fragment>
      <Provider store={store} key="provider">
        <RouterContext {...renderProps} />
      </Provider>
      <GlobalStyle />
    </React.Fragment>
  );
}
