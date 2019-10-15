import { APIDef, GET, Success200, ResponseDef, Error404 } from "@agreed/typed";

export type AgreedSampleGetAPI = APIDef<
  GET, // HTTP Method
  ["agreedsample"],
  {}, // request header
  {}, // request query
  undefined, // request body
  {}, // response header
  | ResponseDef<Success200, { results: { text: string } }>
  | ResponseDef<Error404, { results: { text: string } }> // response
>;

const api: AgreedSampleGetAPI = {
  request: {
    path: ["agreedsample"],
    method: "GET",
    body: undefined,
  },
  response: {
    status: 200,
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

module.exports = api;
