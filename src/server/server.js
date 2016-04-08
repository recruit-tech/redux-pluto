import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import favicon from 'serve-favicon';
import { create as createAxios } from 'axios';
import debugFactory from 'debug';
import axiosConfig from './configs/axiosConfig';
import fetchrConfig from './configs/fetchrConfig';
import { reduxApp as createReduxApp, apiGateway } from './middlewares';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const debug = debugFactory('app:server:main');

const { reduxApp, loadAllMasters } = createReduxApp(fetchrConfig);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(favicon(path.resolve(__dirname, '../../statics/favicon.ico')));
app.use(express.static(path.resolve(__dirname, '../../statics')));
app.use(fetchrConfig.xhrPath, apiGateway(createAxios(axiosConfig)));
app.use(reduxApp);
app.use((req, res) => {
  res.status(404).send('Not found');
});

debug('Creating http server');
const server = http.createServer(app);

loadAllMasters().then(() => {
  const port = +(process.env.PORT || 3001);
  const server = app.listen(port, () => {
    debug(`Listening on port ${port}`);
  });
});

export default server;
