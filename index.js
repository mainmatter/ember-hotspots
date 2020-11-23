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

  contentFor(type) {
    if (type === 'head-footer') {
      return `<script src="/assets/eh-images.js"></script>`;
    }

    return '';
  },
};
