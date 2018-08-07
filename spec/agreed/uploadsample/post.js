module.exports = {
  request: {
    path: "/uploadsample",
    method: "POST",
    body: {
      path: "{:path}",
    },
    values: {
      path: "/public/hoge",
    },
  },
  response: {
    status: 201,
  },
};
