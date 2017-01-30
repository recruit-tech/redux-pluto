const moment = require('moment');
const datetime = moment().format('YYYYMMDD_HHmmss');
const fs = require('fs');
const path = require('path');

const baseFolder = path.resolve(__dirname, datetime);
try {
  fs.mkdirSync(baseFolder);
} catch(e) {
  if (e.code !== 'EEXIST') {
    console.error(e);
    process.exit(1);
  }
}


module.exports = {
  datetime: datetime,
  baseFolder: baseFolder,
  auth: {
    id: 'scott',
    passwd: 'tiger'
  },
};

