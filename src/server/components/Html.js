/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

export default compose(
  setPropTypes({
    assets: PropTypes.object.isRequired,
    content: PropTypes.string,
    initialState: PropTypes.string.isRequired,
    clientConfig: PropTypes.string.isRequired,
  }),
)(function Html(props) {
  const { assets, content, initialState, clientConfig } = props;

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=320,initial-scale=1.0" />
        {Object.keys(assets.styles).map((style) => (
          <link
            key={assets.styles[style]}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script id="initial-state" type="text/plain" data-json={initialState}></script>
        <script id="client-config" type="text/plain" data-json={clientConfig}></script>
        {Object.keys(assets.javascript).map((script) => (
          <script
            key={assets.javascript[script]}
            src={assets.javascript[script]}
            charSet="utf-8"
          ></script>
        ))}
      </body>
    </html>
  );
});
