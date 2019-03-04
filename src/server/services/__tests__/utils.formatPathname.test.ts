import assert from "assert";
import { formatPathname } from "../utils";

test("utils: formatPathname", () => {
  const testCases = [
    { pathname: "", params: [], expected: "" },
    { pathname: "?", params: ["foo"], expected: "foo" },
    { pathname: "/", params: [], expected: "/" },
    { pathname: "/foo", params: [], expected: "/foo" },
    { pathname: "/foo/?", params: ["bar"], expected: "/foo/bar" },
    { pathname: "/foo/?/baz", params: ["bar"], expected: "/foo/bar/baz" },
    { pathname: "/foo/?", params: [null], expected: "/foo/null" },
    { pathname: "/foo/?", params: [123], expected: "/foo/123" },
    { pathname: "/foo/?", params: ["."], expected: "/foo/%2E" },
    { pathname: "/foo/?", params: [".."], expected: "/foo/%2E%2E" },
    { pathname: "/foo/?", params: ["..."], expected: "/foo/..." },
    {
      pathname: "/foo/?",
      params: ["!@#$%^&*()_+=-`~¥\\][{}|';:\"/.,<>?"],
      expected:
        "/foo/!%40%23%24%25%5E%26*()_%2B%3D-%60~%C2%A5%5C%5D%5B%7B%7D%7C'%3B%3A%22%2F.%2C%3C%3E%3F",
    },
    {
      pathname: "/foo/?/bar/?/baz/?/hoge/?/fuga/?/",
      params: ["piyo?", null, 123, "..", {}],
      expected:
        "/foo/piyo%3F/bar/null/baz/123/hoge/%2E%2E/fuga/%5Bobject%20Object%5D/",
    },
    { pathname: "/?", params: [], expected: "/!(MISSING)" },
    { pathname: "/", params: ["foo"], expected: "/" },
    { pathname: "/?", params: ["foo", 123, "..", "!@#$"], expected: "/foo" },
    { pathname: "/?/?/?/?", params: ["foo"], expected: "/foo/!(MISSING)/!(MISSING)/!(MISSING)" },
    { pathname: "/?", params: [""], expected: "/!(EMPTY)" },
    { pathname: "/foo/?/bar", params: [""], expected: "/foo/!(EMPTY)/bar" },
    {
      pathname: "/foo/?/bar/?",
      params: [[], []],
      expected: "/foo/!(EMPTY)/bar/!(EMPTY)",
    },
    {
      pathname: "/?/?/?/?",
      params: ["", "foo", "bar", "baz"],
      expected: "/!(EMPTY)/foo/bar/baz",
    },
  ];
  testCases.forEach(testCase => {
    let actual = formatPathname(testCase.pathname, testCase.params);
    assert.strictEqual(actual, testCase.expected);
  });
});
