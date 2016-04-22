/* eslint-disable react/no-danger */
import React from 'react';

export default function Html({ assetes, content, initialState }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${initialState};` }} />
        <script src={assetes.javascript.client} charSet="UTF-8" />
      </body>
    </html>
  );
}
