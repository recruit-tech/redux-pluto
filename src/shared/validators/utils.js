/* @flow */
import language from "./languages/ja_jp";

export function getOptions() {
  return {
    abortEarly: false,
    language
  };
}

export function normalizeErrors(error: *): {[string]: string} {
  if (!error || !error.details) {
    return {};
  } else {
    return error.details.reduce((errors, { path, message }) => {
      errors[path] = message.replace(/^"\w+" (.*)$/, "$1");
      return errors;
    }, {});
  }
}
