/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import React from "react";
import { compose, setPropTypes } from "recompose";

export default compose(
  setPropTypes({
    assets: PropTypes.object.isRequired,
    content: PropTypes.string,
    initialState: PropTypes.string.isRequired,
    clientConfig: PropTypes.string.isRequired,
  }),
)(function Html(props) {
  const {
    content,
    initialState,
    clientConfig,
    assets: { publicPath, scripts },
    styles,
  } = props as any;

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=320,initial-scale=1.0" />
        {styles && styles.map((style: React.ReactElement<any>) => style)}
        {/* Install serviceWorker only modern browser */}
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
            if (navigator.serviceWorker != null) {
              let isFirstInstall = navigator.serviceWorker.controller == null;
              navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (isFirstInstall) {
                  isFirstInstall = true
                } else {
                  // Update detected
                  // Prompt to reload
                }
              });
              navigator.serviceWorker.register('/sw.js');
            }
            `,
          }}
        />
        {scripts &&
          scripts.map((script: any) => (
            <script
              key={script}
              src={`${publicPath}/${script}`}
              charSet="utf-8"
              async
            />
          ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <div id="devtools" />
        <script id="initial-state" type="text/plain" data-json={initialState} />
        <script id="client-config" type="text/plain" data-json={clientConfig} />
      </body>
    </html>
  );
});
