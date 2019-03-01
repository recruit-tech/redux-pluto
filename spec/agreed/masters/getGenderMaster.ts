import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

type StyleCategory = {
  code: string;
  name: string;
};

export type GetGenderMasterResponse = {
  results: {
    results_available: string;
    results_returned: string;
    results_start: string;
    status: string;
    style_category: Placeholder<StyleCategory[]>;
  };
};

export type GetGenderMasterAPI = APIDef<
  GET,
  ["beauty", "styleCategory"],
  {}, // header
  {
    start: Placeholder<number>;
  }, // request query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetGenderMasterResponse>
>;

const api: GetGenderMasterAPI = {
  request: {
    path: ["beauty", "styleCategory"],
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
        style_category: "{:style_category}",
      },
    },
    values: {
      results_available: "2",
      results_returned: "2",
      results_start: "1",
      status: "OK",
      style_category: [
        { code: "SG01", name: "レディース" },
        { code: "SG02", name: "メンズ" },
      ] as StyleCategory[],
    },
  },
};

module.exports = api;
