import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  convert,
  Error404,
} from "agreed-typed";

module.exports = [
  {
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
  },
];
