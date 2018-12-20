import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  convert,
  Error404,
} from "agreed-typed";

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

module.exports = [
  {
    request: {
      path: "/beauty/style/v3",
      method: "GET",
      params: {
        start: "{:start}",
      },
      values: {
        start: 1,
      },
    },
    response: {
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
  },
];
