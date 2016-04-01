/* eslint-disable react/no-danger */
import React from 'react';

export default function Html({ content, initialState }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${JSON.stringify(initialState)};` }} />
        <script src="/public/client.js" />
      </body>
    </html>
  );
}
