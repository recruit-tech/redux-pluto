/* @flow */
import axios from "axios";
import { HttpError } from "fumble";
import { create } from "../utils";

test("should provide an http object success", async () => {
  await create(axios, "foo", "http://localhost:3020/uploadsample", {
    path: "public/hoge",
  });
});

test("should provide an http object failure", async () => {
  try {
    await create(axios, "foo", "http://localhost:3020/foo");
  } catch (e) {
    expect(e).toEqual(new HttpError(404));
  }
});

test("should provide an http object response failure", async () => {
  try {
    await create(axios, "foo", "foo");
  } catch (e) {
    expect(e).toEqual(new HttpError(500));
  }
});
