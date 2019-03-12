/* eslint-disable react/no-danger */
import React from "react";

export default function Html(props: any) {
  const {
    content,
    initialState,
    clientConfig,
    assets: { publicPath, scripts },
    title,
    useragent,
    styles,
  } = props;

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=320,initial-scale=1.0" />
        <title>{title}</title>
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
        {useragent.browser !== "Chrome" && useragent.browser !== "Firefox" && (
          <script src="https://polyfill.io/v3/polyfill.js?features=es5,es6,es7&flags=gated" />
        )}
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
}
