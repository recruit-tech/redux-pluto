import path from 'path';

const rootDir = path.resolve(__dirname, '../../..');

export default {
  // https://github.com/expressjs/body-parser
  bodyParser: {
    // https://github.com/expressjs/body-parser#bodyparserjsonoptions
    json: {},

    // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
    urlencoded: {
      extended: true,
    },
  },

  // https://github.com/jshttp/cookie
  cookieParser: null,

  // https://github.com/expressjs/session
  session: {
    secret: 'redux-proto',
    resave: false,
    saveUninitialized: false,
  },

  // https://github.com/expressjs/csurf
  csurf: {
    cookie: true,
  },

  // https://github.com/expressjs/serve-favicon
  favicon: path.resolve(rootDir, 'statics/favicon.ico'),

  // https://github.com/expressjs/serve-static
  static: path.resolve(rootDir, 'statics'),

  // https://github.com/yahoo/fetchr
  fetchr: {
  },

  // https://github.com/mzabriskie/axios#request-config
  axios: {
    baseURL: 'http://beauty.sda.hotpepper.jp/',
    params: {
      key: 'hK8GrzWsq80d',
      format: 'json',
    },
  },

  clientConfig: {
    // https://github.com/yahoo/fetchr
    fetchr: {
      xhrPath: '/api',
      xhrTimeout: 5000,
      context: {},
      contextPicker: {
        GET: [],
      },
    },
  },
};
