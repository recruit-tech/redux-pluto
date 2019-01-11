import React from "react";

export default function Html(props: {
  content: string;
  initialState: string;
  clientConfig: string;
}) {
  const { content, initialState, clientConfig, styles } = props as any;

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
