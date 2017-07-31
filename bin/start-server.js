const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');
const debugFactory = require('debug');

const debug = debugFactory('app:server:main');
const development = process.env.NODE_ENV !== 'production';

debug('Creating http server...');
const server = http.createServer();

createApp().then((app) => {
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

  server.on('request', app);

  const port = +(process.env.PORT || 3000);
  server.listen(port, () => {
    debug(`Listening on port ${port}`);
  });
}).catch((err) => {
  debug(err);
  process.exit(1);
});

function createApp() {
  const app = express();
  return development ? createAppForDevelopment(app) : createAppForProduction(app);
}

/* eslint-disable global-require, import/no-extraneous-dependencies */
function createAppForProduction(app) {
  const clientStats = require('../build/client/stats.json');
  const serverRender = require('../build/server/main.js').default;
  return new Promise((resolve, reject) => {
    app.use(serverRender({
      clientStats,
      server,
      resolve,
      reject,
    }));
  }).then(() => app);
}

function createAppForDevelopment(app) {
  debug('Compiling webpack...');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const clientConfig = require('../src/webpack/dev.client.config');
  const serverConfig = require('../src/webpack/dev.server.config');

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const publicPath = clientConfig.output.publicPath;
  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));

  const clientCompiler = multiCompiler.compilers[0];
  app.use(webpackHotMiddleware(clientCompiler));

  const initServerPromise = new Promise((resolve, reject) => {
    app.use(
      webpackHotServerMiddleware(multiCompiler, {
        serverRendererOptions: {
          server,
          resolve,
          reject,
        },
      }),
    );
  });

  const compilerPromise = new Promise((resolve, reject) => {
    multiCompiler.plugin('done', (multiStats) => {
      resolve();
    });
  });

  return Promise.all([initServerPromise, compilerPromise]).then(() => app);
}

/* eslint-enable global-require, import/no-extraneous-dependencies */
