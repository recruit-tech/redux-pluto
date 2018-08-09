/* @flow */
import axios from "axios";
import { HttpError } from "fumble";
import { read } from "../utils";

test("should provide an http object success", async () => {
  const result = await read(
    axios,
    "foo",
    "http://localhost:3020/agreedsample",
    {
      stats: 200,
    },
  );
  expect(result).toEqual({ text: "Hello world" });
});

test("should provide an http object failure", async () => {
  try {
    await read(axios, "foo", "http://localhost:3020/foo");
  } catch (e) {
    expect(e).toEqual(new HttpError(404));
  }
});

test("should provide an http object response failure", async () => {
  try {
    await read(axios, "foo", "foo");
  } catch (e) {
    expect(e).toEqual(new HttpError(500));
  }
});
