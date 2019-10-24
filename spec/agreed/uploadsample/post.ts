import { APIDef, POST, Success201, ResponseDef } from "@agreed/typed";

export type PostAPI = APIDef<
  POST,
  ["uploadsample"],
  {}, // header
  {}, // query
  { path: string }, // request body
  {}, // response header
  ResponseDef<Success201, {}>
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

const api: PostAPI = {
  request: {
    path: ["uploadsample"],
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
};

module.exports = api;
