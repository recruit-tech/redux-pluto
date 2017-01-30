const Nightmare = require('nightmare');
const nightmare = Nightmare({ 
  show: true,
  switches: {
    'ignore-certificate-errors': true
  },
});
const fs = require('fs');
const path = require('path');
const configs = require('./configs');
const baseFolder = configs.baseFolder;

nightmare
  .goto('http://localhost:3000')
  .wait('#root')
  .wait(2000)
  .screenshot(`${baseFolder}/top.png`)
  .end(function () {
    console.log('Finished');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

