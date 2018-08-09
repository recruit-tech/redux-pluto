module.exports = {
  request: {
    path: "/agreedsample",
    method: "GET",
    query: {
      status: "{:status}",
    },
  },
  response: {
    status: "{:status}",
    body: {
      results: {
        text: "{:text}",
      },
    },
    values: {
      text: "Hello world",
    },
  },
};
