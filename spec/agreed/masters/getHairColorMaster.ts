import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

export type HairColor = {
  code: string;
  name: string;
};

export type GetHairColorMasterResponse = {
  results: {
    results_available: string;
    results_returned: string;
    results_start: string;
    status: string;
    hair_color: HairColor[];
  };
};

export type GetAreaMasterAPI = APIDef<
  GET,
  ["beauty", "hairColor"],
  {},
  {
    start: Placeholder<number>;
  }, // request query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetHairColorMasterResponse>
  // | ResponseDef<Error404, { results: { text: string } }> // response
>;

// TODO: Cast
const api = {
  request: {
    path: "/beauty/hairColor",
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
        hair_color: "{:hair_color}",
      },
    },
    values: {
      results_available: "5",
      results_returned: "5",
      results_start: "1",
      status: "OK",
      hair_color: [
        { code: "HC01", name: "ブラウン・ベージュ系" },
        { code: "HC02", name: "イエロー・オレンジ系" },
        { code: "HC03", name: "レッド・ピンク系" },
        { code: "HC04", name: "アッシュ・ブラック系" },
        { code: "HC05", name: "その他カラー" },
      ],
    },
  },
};

module.exports = api;
