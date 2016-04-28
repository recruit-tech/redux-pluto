/* eslint-disable react/no-danger */
import React from 'react';

export default function Html({ assetes, content, initialState, clientConfig }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${initialState};` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__CLIENT_CONFIG__=${clientConfig};` }} />
        <script src={assetes.javascript.client} charSet="UTF-8" />
      </body>
    </html>
  );
}
