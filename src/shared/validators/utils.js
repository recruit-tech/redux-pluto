import language from './languages/ja_jp';

export function getOptions() {
  return {
    abortEarly: false,
    language,
  };
}

export function formatErrors(error) {
  if (!error || !error.details) {
    return {};
  }

  return error.details.reduce((errors, { path, message }) => {
    errors[path] = message.replace(/^"\w+" (.*)$/, '$1');
    return errors;
  }, {});
}
