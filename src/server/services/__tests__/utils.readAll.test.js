/* @flow */
import axios from "axios";
import { readAll } from "../utils";

test("should provide an http object nothing available success", async () => {
  const result = await readAll(
    axios,
    "foo",
    "http://localhost:3020/agreedsample",
    {
      stats: 200,
    },
  );
  expect(result).toEqual({ text: "Hello world" });
});

test("should provide an http object available success", async () => {
  const result = await readAll(
    axios,
    "foo",
    "http://localhost:3020/beauty/smallArea",
    null,
    "small_area",
    [],
  );
});
