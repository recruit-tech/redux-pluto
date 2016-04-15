export default {
  session: {
    secret: 'redux-proto',
  },

  csurf: {
    cookie: true,
  },

  fetchr: {
    xhrPath: '/api',
  },

  axios: {
    baseURL: 'http://beauty.sda.hotpepper.jp/',
    params: {
      key: 'hK8GrzWsq80d',
      format: 'json',
    },
  },
};
