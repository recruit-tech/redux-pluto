import assert from "assert";
import { formatPathname } from "../utils";

test("utils: formatPathname success", () => {
  const testCases = [
    { pathname: "", args: [], expected: "" },
    { pathname: "?", args: ["foo"], expected: "foo" },
    { pathname: "/", args: [], expected: "/" },
    { pathname: "/foo", args: [], expected: "/foo" },
    { pathname: "/foo/?", args: ["bar"], expected: "/foo/bar" },
    { pathname: "/foo/?/baz", args: ["bar"], expected: "/foo/bar/baz" },
    { pathname: "/foo/?", args: [null], expected: "/foo/null" },
    { pathname: "/foo/?", args: [123], expected: "/foo/123" },
    { pathname: "/foo/?", args: ["."], expected: "/foo/%2E" },
    { pathname: "/foo/?", args: [".."], expected: "/foo/%2E%2E" },
    { pathname: "/foo/?", args: ["..."], expected: "/foo/..." },
    {
      pathname: "/foo/?",
      args: ["!@#$%^&*()_+=-`~¥\\][{}|';:\"/.,<>?"],
      expected:
        "/foo/!%40%23%24%25%5E%26*()_%2B%3D-%60~%C2%A5%5C%5D%5B%7B%7D%7C'%3B%3A%22%2F.%2C%3C%3E%3F",
    },
    {
      pathname: "/foo/?/bar/?/baz/?/hoge/?/fuga/?/",
      args: ["piyo?", null, 123, "..", {}],
      expected:
        "/foo/piyo%3F/bar/null/baz/123/hoge/%2E%2E/fuga/%5Bobject%20Object%5D/",
    },
  ];
  testCases.forEach(testCase => {
    let actual = formatPathname(testCase.pathname, testCase.args);
    assert.strictEqual(actual, testCase.expected);
  });
});

test("utils: formatPathname error", () => {
  const testCases = [
    {
      pathname: "/?",
      args: [],
      expectedErr: {
        message: "number of placeholders should be same to args length",
      },
    },
    {
      pathname: "/",
      args: ["foo"],
      expectedErr: {
        message: "number of placeholders should be same to args length",
      },
    },
    {
      pathname: "/?",
      args: ["foo", 123, "..", "!@#$"],
      expectedErr: {
        message: "number of placeholders should be same to args length",
      },
    },
    {
      pathname: "/?/?/?/?",
      args: ["foo"],
      expectedErr: {
        message: "number of placeholders should be same to args length",
      },
    },
    {
      pathname: "/?",
      args: [""],
      expectedErr: { message: "invalid pathname argument" },
    },
    {
      pathname: "/foo/?/bar",
      args: [""],
      expectedErr: { message: "invalid pathname argument" },
    },
    {
      pathname: "/foo/?/bar/?",
      args: [[], []],
      expectedErr: { message: "invalid pathname argument" },
    },
    {
      pathname: "/?/?/?/?",
      args: ["", "foo", "bar", "baz"],
      expectedErr: { message: "invalid pathname argument" },
    },
  ];
  testCases.forEach(testCase => {
    assert.throws(() => {
      formatPathname(testCase.pathname, testCase.args);
    }, testCase.expectedErr);
  });
});
