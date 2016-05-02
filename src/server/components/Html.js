/* eslint-disable react/no-danger */
import React from 'react';

export default function Html({ assets, content, initialState, clientConfig }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        {Object.keys(assets.styles).map((style, i) => (
          <link
            key={i}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css" />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${initialState};` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__CLIENT_CONFIG__=${clientConfig};` }} />
        {Object.keys(assets.javascript).map((script, i) => (
          <script key={i} src={assets.javascript[script]} charSet="utf-8" />
        ))}
      </body>
    </html>
  );
}
