'use strict';

const glob = require('glob');
const path = require('path');

const SizeUpImages = require('./lib/SizeUpImages');
const imageStats = require('./lib/image-stats');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    this._options = {
      cwd: '/',
      preload: true,
      prefetch: true,
      glob: '**/*.{gif,jpg,png,svg}',
      ...(app.options['ember-hotspots'] ?? {}),
    };
  },

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new SizeUpImages(this.app.trees.public, this._options);
  },

  contentFor(type, app) {
    if (
      type === 'head-footer' &&
      this._options.prefetch &&
      app.environment === 'production'
    ) {
      const cwd = path.join(
        process.cwd(),
        this.app.trees.public,
        this._options.cwd
      );
      const files = glob
        .sync(this._options.glob, {
          cwd,
        })
        .reduce(
          (acc, file) => ({
            ...acc,
            [file]: imageStats(path.join(cwd, file)),
          }),
          {}
        );

      return `${Object.keys(files).reduce(
        (acc, filename) =>
          `${acc}\n<link rel="preload" href="/${filename}" as="image">`,
        ''
      )}\n`;
    }

    return '';
  },
};
