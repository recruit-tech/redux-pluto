import { convert } from "agreed-typed";
import { flatten } from "lodash";

module.exports = convert(
  ...flatten([
    require("./agreedsample/get"),
    require("./uploadsample/post"),
  ]),
);
