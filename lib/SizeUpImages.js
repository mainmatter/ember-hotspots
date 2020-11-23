const Plugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const imageStats = require('./image-stats');
const path = require('path');
const fs = require('fs');
const Funnel = require('broccoli-funnel');
const mkdirp = require('mkdirp');

module.exports = class SizeUpImages extends Plugin {
  constructor(directory, options = {}) {
    super([new Funnel(directory)], options);
    this.options = { outputFile: 'eh-hotspots.json', ...options };
  }

  build() {
    const content = this.inputPaths.reduce((acc, inputPath) => {
      const paths = walkSync(inputPath, {
        includeBasePath: false,
        directories: false,
        globs: Array.isArray(this.options.glob)
          ? this.options.glob
          : [this.options.glob],
      });

      paths.forEach((file) => {
        acc[file] = imageStats(path.join(inputPath, file));
      });

      return acc;
    }, {});

    let output = path.join(this.outputPath, 'assets');

    mkdirp.sync(output);

    fs.writeFileSync(
      path.join(output, this.options.outputFile),
      JSON.stringify(content)
    );
  }
};
