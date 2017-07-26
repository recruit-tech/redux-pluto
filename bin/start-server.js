const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');
const debugFactory = require('debug');

const debug = debugFactory('app:server:main');
const development = process.env.NODE_ENV !== 'production';

const app = express();

/* eslint-disable global-require, import/no-extraneous-dependencies */
if (development) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const clientConfig = require('../src/webpack/dev.client.config');
  const serverConfig = require('../src/webpack/dev.server.config');

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  const publicPath = clientConfig.output.publicPath;
  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: {},
    }),
  );
} else {
  const clientStats = require('../build/client/stats.json');
  const serverRender = require('../build/server/main.js').default;

  app.use(serverRender({ clientStats }));
}
/* eslint-enable global-require, import/no-extraneous-dependencies */

app.use((req, res) => {
  res.status(404).send('Not found');
});
if (development) {
  app.use(errorhandler());
} else {
  app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
  });
}

debug('Creating http server');
const server = http.createServer(app);
const port = +(process.env.PORT || 3000);
server.listen(port, () => {
  debug(`Listening on port ${port}`);
});
