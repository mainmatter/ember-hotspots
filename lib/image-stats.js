const sizeOf = require('image-size');
const fs = require('fs');
const path = require('path');

module.exports = function imageStats(filePath) {
  let { width, height } = sizeOf(filePath);
  let { size } = fs.statSync(filePath);
  let isRetina = path
    .basename(filePath, path.extname(filePath))
    .endsWith('@2x');

  return {
    width: isRetina ? width / 2 : width,
    height: isRetina ? height / 2 : height,
    size,
    isRetina,
  };
};
