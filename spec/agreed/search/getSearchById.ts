import { APIDef, GET, Success200, ResponseDef, Capture } from "agreed-typed";

export type GetSearchByIdResponse = {
  results: {
    search: Array<{
      name: string;
      urls: {
        pc: string;
        mobile: string;
      };
    }>;
  };
};

export type GetSearchByIdAPI = APIDef<
  GET,
  ["beauty", "search", Capture<":id">],
  {}, // header
  {}, // query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetSearchByIdResponse>
>;

const api: GetSearchByIdAPI = {
  request: {
    path: ["beauty", "search", ":id"],
    method: "GET",
    body: undefined,
  },
  response: {
    status: 200,
    body: {
      results: {
        search: [
          {
            name: "{:name}",
            urls: {
              pc: "{:pc}",
              mobile: "{:mobile}",
            },
          },
        ],
      },
    },
    values: {
      name: "サロン",
      pc: "/public/cat_large.jpeg",
      mobile: "/public/cat_small.jpeg",
    },
  },
};

module.exports = api;
