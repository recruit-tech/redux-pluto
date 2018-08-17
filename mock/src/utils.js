/* eslint-disable */

const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const axios = require("axios");

exports.writeFile = writeFile = (filepath, data) => {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(filepath), err => {
      if (err) return reject(err);
      return fs.writeFile(filepath, data, err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  });
};
