const Plugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const imageStats = require('./image-stats');
const path = require('path');
const fs = require('fs');
const Funnel = require('broccoli-funnel');

module.exports = class SizeUpImages extends Plugin {
  constructor(directory, options = {}) {
    const tree = new Funnel(directory);

    super([tree], options);
    this.outputFile = 'eh-images.js';
  }

  build() {
    const content = this.inputPaths.reduce((acc, inputPath) => {
      const paths = walkSync(inputPath, {
        includeBasePath: false,
        directories: false,
        globs: ['**/*.{gif,jpg,png,svg}'],
      });

      paths.forEach((file) => {
        acc[file] = imageStats(path.join(inputPath, file));
      });

      return acc;
    }, {});

    fs.mkdirSync(path.join(this.outputPath, 'assets'), { recursive: true });
    fs.writeFileSync(
      path.join(this.outputPath, 'assets', this.outputFile),
      `window.EH_IMAGES=${JSON.stringify(content)}`
    );
  }
};
