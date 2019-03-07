import assert from "assert";
import { isSafePath } from "../utils";

test("utils: isSafePath", () => {
  const testCases = [
    { pathname: "/", expected: true },
    { pathname: ".", expected: true },
    { pathname: "foo", expected: true },
    { pathname: "/foo", expected: true },
    { pathname: "foo/", expected: true },
    { pathname: "/foo/", expected: true },
    { pathname: "foo/bar", expected: true },
    { pathname: "", expected: false },
    { pathname: "foo//", expected: false },
    { pathname: "//foo", expected: false },
    { pathname: "foo//bar", expected: false },
    { pathname: "foo/./bar", expected: false },
    { pathname: "foo/../bar", expected: false },
  ];
  testCases.forEach(testCase => {
    const actual = isSafePath(testCase.pathname);
    assert.strictEqual(actual, testCase.expected);
  });
});
