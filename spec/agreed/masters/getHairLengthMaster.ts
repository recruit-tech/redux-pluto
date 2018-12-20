import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

type HairLength = {
  code: string;
  name: string;
  style_category: { code: string; name: string };
  hair_length_seo_name: string;
};

export type GetHairColorMasterResponse = {
  results: {
    results_available: string;
    results_returned: string;
    results_start: string;
    status: string;
    hair_length: Placeholder<HairLength[]>;
  };
};

export type GetHairLengthMasterAPI = APIDef<
  GET,
  ["beauty", "hairLength", "v3"],
  {},
  {
    start: Placeholder<number>;
  }, // request query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetHairColorMasterResponse>
  // | ResponseDef<Error404, { results: { text: string } }> // response
>;

const api: GetHairLengthMasterAPI = {
  request: {
    path: ["beauty", "hairLength", "v3"],
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
        hair_length: "{:hair_length}",
      },
    },
    values: {
      results_available: "13",
      results_returned: "13",
      results_start: "1",
      status: "OK",
      hair_length: [
        {
          code: "HL03",
          name: "ミディアム",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ミディアム",
        },
        {
          code: "HL04",
          name: "ショート",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ショート",
        },
        {
          code: "HL02",
          name: "セミロング",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "セミロング",
        },
        {
          code: "HL01",
          name: "ロング",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ロング",
        },
        {
          code: "HL05",
          name: "ベリーショート",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ベリーショート",
        },
        {
          code: "HL08",
          name: "ヘアセット",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ヘアセット",
        },
        {
          code: "HL07",
          name: "ミセス",
          style_category: { code: "SG01", name: "レディース" },
          hair_length_seo_name: "ミセス",
        },
        {
          code: "HL11",
          name: "ショート",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ ショート",
        },
        {
          code: "HL10",
          name: "ベリーショート",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ ベリーショート",
        },
        {
          code: "HL12",
          name: "ミディアム",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ ミディアム",
        },
        {
          code: "HL09",
          name: "ボウズ",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ ボウズ",
        },
        {
          code: "HL13",
          name: "ロング",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ ロング",
        },
        {
          code: "HL06",
          name: "その他",
          style_category: { code: "SG02", name: "メンズ" },
          hair_length_seo_name: "メンズ その他",
        },
      ],
    },
  },
};

module.exports = api;
