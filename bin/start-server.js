const http = require("http");
const express = require("express");
const errorhandler = require("errorhandler");
const debugFactory = require("debug");

const debug = debugFactory("app:server:main");
const development = process.env.NODE_ENV !== "production";

process.on("uncaughtException", err => {
  debug("Uncaught exception");
  debug(err);
  throw err;
});

process.on("unhandledRejection", err => {
  debug("Unhandled Rejection");
  debug(err);
});

debug("Creating http server...");
const server = http.createServer();

createApp()
  .then(app => {
    server.on("request", app);

    const port = +(process.env.PORT || 3000);
    server.listen(port, () => {
      debug(`Listening on port ${port}`);
    });
  })
  .catch(err => {
    debug(err);
    process.exit(1);
  });

function createApp() {
  const app = express();
  return (development
    ? setupAppForDevelopment(app)
    : setupAppForProduction(app)
  ).then(() => {
    app.use((req, res) => {
      res.status(404).send("Not found");
    });

    if (development) {
      app.use(errorhandler());
    } else {
      app.use((err, req, res, next) => {
        res.status(500).send("Internal Server Error");
      });
    }

    return app;
  });
}

/* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved */
function setupAppForProduction(app) {
  const clientStats = require("../build/client/stats.json");
  const serverRender = require("../build/server/main.js").default;
  const promises = [];

  app.use(
    serverRender({
      clientStats,
      server,
      promises,
    }),
  );
  return Promise.all(promises);
}

function setupAppForDevelopment(app) {
  const { MemoryStore } = require("express-session");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
  const clientConfig = require("../src/webpack/dev.client.config");
  const serverConfig = require("../src/webpack/dev.server.config");

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];
  const { output: outputPublicPath } = clientConfig;
  const { publicPath } = outputPublicPath;
  const promises = [];

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: {
        server,
        sessionStore: new MemoryStore(),
        promises,
      },
    }),
  );

  debug("Compiling webpack...");
  const intervalId = setInterval(() => {
    debug("Compiling webpack...");
  }, 3000);

  return new Promise((resolve, reject) => {
    multiCompiler.plugin("done", multiStats => {
      debug("Done compile");
      clearInterval(intervalId);
      resolve();
    });
  }).then(() => Promise.all(promises));
}

/* eslint-enable global-require, import/no-extraneous-dependencies */
