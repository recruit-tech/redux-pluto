const fs = require("fs");
const util = require("util");
const path = require("path");
const mkdirp = util.promisify(require("mkdirp"));

exports.writeFile = async (filepath, data) => {
  await mkdirp(path.dirname(filepath));
  return fs.writeFileSync(filepath, data);
};
