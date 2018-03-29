import Joi from "joi";
import { getOptions, normalizeErrors } from "./utils";

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(15)
  .required();

const password = Joi.string()
  .regex(/^[a-zA-Z0-9]{3,15}$/)
  .required()
  .options({
    language: {
      string: {
        regex: { base: "3文字以上15文字以下の英数字を入力してください。" }
      }
    }
  });

const schema = Joi.object().keys({
  username,
  password
});

export default function validate(values) {
  const { error } = Joi.validate(values, schema, getOptions());
  return normalizeErrors(error);
}
