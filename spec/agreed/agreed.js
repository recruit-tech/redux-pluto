require("agreed-core/lib/register")()
module.exports = [
  require("./agreedsample/get.json5"),
  require("./uploadsample/post.json5"),
  require("./search/getSearchById.json5"),
  require("./search/getSearchList.js"),
  require("./style/getStyle.js"),
  require("./masters/getGenderMaster.json5"),
  require("./masters/getHairLengthMaster.json5"),
  require("./masters/getHairColorMaster.json5"),
  require("./masters/getAreaMaster.json5"),
  require("./masters/getMenuContentsMaster.json5")
];
