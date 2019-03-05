import { convert } from "agreed-typed";
import { flatten } from "lodash";

module.exports = convert(
  ...flatten([
    require("./agreedsample/get"),
    require("./uploadsample/post"),
    require("./style/getStyle"),
    require("./masters/getGenderMaster"),
    require("./masters/getHairLengthMaster"),
    require("./masters/getHairColorMaster"),
    require("./masters/getAreaMaster"),
    require("./masters/getMenuContentsMaster"),
  ]),
);
