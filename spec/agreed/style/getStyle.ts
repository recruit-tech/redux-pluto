import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

export type GetStyleResponse = {
  results: {
    results_available: string;
    results_returned: string;
    results_start: string;
    status: string;
    style: Placeholder<
      Array<{
        id: string;
        name: string;
        photo: {
          front: {
            m: string;
          };
        };
      }>
    >;
  };
};

export type GetStyleAPI = APIDef<
  GET,
  ["beauty", "style", "v3"],
  {}, // header
  {
    start: Placeholder<number>;
  }, // query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetStyleResponse>
>;

const style = [];
for (let i = 1; i <= 100; i++) {
  style.push({
    id: i.toString(),
    name: "ヘアスタイル",
    photo: {
      front: {
        m: "/public/cat_medium.jpeg",
      },
    },
  });
}

const api: GetStyleAPI = {
  request: {
    path: ["beauty", "style", "v3"],
    method: "GET",
    query: {
      start: "{:start}",
    },
    values: {
      start: 1,
    },
    body: undefined,
  },
  response: {
    status: 200,
    body: {
      results: {
        results_available: "{:results_available}",
        results_returned: "{:results_returned}",
        results_start: "{:results_start}",
        status: "{:status}",
        style: "{:style}",
      },
    },
    values: {
      results_available: "10000",
      results_returned: "100",
      results_start: "1",
      status: "OK",
      style,
    },
  },
};

module.exports = api;
