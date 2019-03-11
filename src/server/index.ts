import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import session from "express-session";
import useragent from "express-useragent";
import csurf from "csurf";
import favicon from "serve-favicon";
import serverTiming from "server-timing";
import config from "./configs";
import AssetsHandler from "./middlewares/AssetsHandler";
import { apiGateway, offloadDetector, reduxApp } from "./middlewares";

export default function renderer({
  clientStats,
  server,
  sessionStore,
  promises,
}: any) {
  const app = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
  app.use(cookieParser(config.cookieParser as any));
  app.use(session({ store: sessionStore, ...config.session }));
  app.use(csurf(config.csurf));
  app.use(serverTiming());
  app.use(favicon(config.favicon));
  app.use(useragent.express());

  if (!__DEVELOPMENT__) {
    const assetsHandler = new AssetsHandler(clientStats.assets);
    app.use(
      clientStats.publicPath,
      assetsHandler.handleUrl.bind(assetsHandler),
    );
  }

  config.assets.forEach(asset => {
    app.use(asset.mount, express.static(asset.path));
  });

  app.use(config.clientConfig.fetchr.xhrPath, apiGateway(config, app));
  app.use(compression());
  if (__ENABLE_OFFLOAD__) {
    app.use(offloadDetector(config.offload));
  }
  app.use(reduxApp({ ...config, clientStats, promises }));

  return app;
}
