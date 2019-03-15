import React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
// import RouterContext from "react-router/lib/RouterContext";
import { createGlobalStyle } from "styled-components";
import { RootState } from "../../shared/redux/modules/reducer";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";

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
  store: Store<RootState, any>;
  routes: Array<any>;
  url: string;
};

export default function App(props: Props) {
  const { store, routes, url } = props;
  const context: any = {};
  return (
    <>
      <Provider store={store} key="provider" context={context}>
        <StaticRouter location={url}>{renderRoutes(routes)}</StaticRouter>
        {/* <RouterContext {...renderProps} /> */}
      </Provider>
      <GlobalStyle />
    </>
  );
}
