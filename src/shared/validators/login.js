/* @flow */
import { regexp, shape, required, combine } from "favalid";

const ERROR_REQUIRED = () => "必須項目です。";
const ERROR_MESSAGE = () => "3文字以上15文字以下の英数字を入力してください。";

const username = combine(
  required(ERROR_REQUIRED),
  regexp(/^[a-zA-Z0-9]{3,15}$/, ERROR_MESSAGE, {}),
);

const password = combine(
  required(ERROR_REQUIRED),
  regexp(/^[a-zA-Z0-9]{3,15}$/, ERROR_MESSAGE, {}),
);

const schema = shape({
  username,
  password,
});

export default function validate(values: *) {
  const errors = schema(values);
  return Object.keys(errors).reduce((p, key) => {
    if (errors[key].error) {
      p[key] = errors[key].message;
    }
    return p;
  }, {});
}
