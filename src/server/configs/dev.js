export default {
  session: {
    secret: 'redux-proto',
  },

  csrf: {
    cookie: true,
  },

  fetchr: {
  },

  axios: {
    baseURL: 'http://beauty.sda.hotpepper.jp/',
    params: {
      key: 'hK8GrzWsq80d',
      format: 'json',
    },
  },

  clientConfig: {
    fetchr: {
      xhrPath: '/api',
      context: {},
    },
  },
};
