import {
  APIDef,
  GET,
  Success200,
  ResponseDef,
  Placeholder,
} from "agreed-typed";

export type GetSearchListResponse = {
  results: {
    results_available: Placeholder<number>;
    results_returned: Placeholder<number>;
    results_start: Placeholder<string>;
    status: Placeholder<string>;
    search: Placeholder<
      Array<{
        id: string;
        last_update: string;
        name: string;
        logo_image: string;
        logo_image_square: string;
        urls: {
          pc: string;
          mobile: string;
        };
        description: string;
      }>
    >;
  };
};

export type GetSearchListAPI = APIDef<
  GET,
  ["beauty", "search"],
  {}, // header
  {
    keyword: string;
    page: string;
    start: Placeholder<number>;
  }, // query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, GetSearchListResponse>
>;

const SEARCH_MAX_COUNT = 50;
const RESULTS_COUNT = 500;

const searchList = [];
for (let i = 1; i <= SEARCH_MAX_COUNT; i++) {
  searchList.push({
    id: i.toString(),
    last_update: "2017-01-04 00:00:00",
    name: `サロン${i}`,
    logo_image: "/public/cat_large.jpeg",
    logo_image_square: "/public/cat_small.jpeg",
    urls: {
      pc: "/public/cat_large.jpeg",
      mobile: "/public/cat_small.jpeg",
    },
    description: `コメント${i}`,
  });
}

const api: GetSearchListAPI = {
  request: {
    path: ["beauty", "search"],
    method: "GET",
    query: {
      keyword: "{:keyword}",
      page: "{:page}",
      start: "{:start}",
    },
    values: {
      keyword: "サロン",
      page: "0",
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
        search: "{:search}",
      },
    },
    values: {
      results_available: RESULTS_COUNT,
      results_returned: SEARCH_MAX_COUNT,
      results_start: "1",
      status: "OK",
      search: searchList,
    },
  },
};

module.exports = api;
