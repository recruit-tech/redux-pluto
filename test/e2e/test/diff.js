const BlinkDiff = require('blink-diff');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
let actualDir = process.argv[2];
let expectedDir = process.argv[3];

const diffFolder = path.resolve(__dirname, 'diff');
try {
  fs.mkdirSync(diffFolder);
} catch(e) {
  if (e.code !== 'EEXIST') {
    console.error(e);
    process.exit(1);
  }
}

if (!actualDir) {
  const currentFiles = fs.readdirSync(__dirname).filter((currentFile) => moment(currentFile, 'YYYYMMDD_HHmmss').isValid());

  actualDir = path.resolve(__dirname, currentFiles[currentFiles.length - 2]);
  expectedDir = path.resolve(__dirname, currentFiles[currentFiles.length - 1]);
}
const expectedFiles = fs.readdirSync(expectedDir);

expectedFiles.forEach((expectedFile) => {
  const diff = new BlinkDiff({
    imageAPath: path.resolve(actualDir, expectedFile),
    imageBPath: path.resolve(expectedDir, expectedFile),
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold
    imageOutputPath: path.resolve(diffFolder, expectedFile),
  });
  diff.run((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (result) {
      if (!diff.hasPassed(result.code)) {
        console.log(path.resolve('diff', expectedFile));
        console.log('Found ' + result.differences + ' differences.');
      }
    }
    console.log('Finished');
  });
});

