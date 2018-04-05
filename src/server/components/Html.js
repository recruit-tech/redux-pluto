/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import { compose, setPropTypes } from "recompose";

export default compose(
  setPropTypes({
    assets: PropTypes.object.isRequired,
    content: PropTypes.string,
    initialState: PropTypes.string.isRequired,
    clientConfig: PropTypes.string.isRequired
  })
)(function Html(props) {
  const {
    content,
    initialState,
    clientConfig,
    assets: { publicPath, scripts, stylesheets, inlineStylesheets, cssHashRaw },
    styles
  } = props;

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=320,initial-scale=1.0" />
        {/* TODO: Expand styles without wrapper */}
        <style
          type="text/css"
          media="screen, projection"
          dangerouslySetInnerHTML={{
            __html: styles
          }}
        />
        {stylesheets &&
          stylesheets.map(style => (
            <link
              key={style}
              href={`${publicPath}/${style}`}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
            />
          ))}
        {inlineStylesheets &&
          inlineStylesheets.map(style => (
            <style
              key={style.name}
              type="text/css"
              media="screen, projection"
              dangerouslySetInnerHTML={{
                __html: style.content
              }}
            />
          ))}
        {scripts &&
          scripts.map(script => (
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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__CSS_CHUNKS__= ${JSON.stringify(cssHashRaw)}`
          }}
        />
      </body>
    </html>
  );
});
