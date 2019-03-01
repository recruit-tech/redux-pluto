import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

type Menu = {
  code: string;
  name: string;
};

export type GetMenuContentsMasterResponse = {
  results: {
    results_available: string;
    results_returned: string;
    results_start: string;
    status: string;
    menu_content: Placeholder<Menu[]>;
  };
};

export type GetMenuContentsMasterAPI = APIDef<
  GET,
  ["beauty", "menuContents"],
  {},
  {
    start: Placeholder<number>;
  }, // request query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetMenuContentsMasterResponse>
  // | ResponseDef<Error404, { results: { text: string } }> // response
>;

const api: GetMenuContentsMasterAPI = {
  request: {
    path: ["beauty", "menuContents"],
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
        menu_content: "{:menu_content}",
      },
    },
    values: {
      results_available: "3",
      results_returned: "3",
      results_start: "1",
      status: "OK",
      menu_content: [
        { code: "MC01", name: "パーマ" },
        { code: "MC02", name: "ストレートパーマ・縮毛矯正" },
        { code: "MC03", name: "エクステ" },
      ],
    },
  },
};

module.exports = api;
