'use strict';

const SizeUpImages = require('./lib/SizeUpImages');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new SizeUpImages(this.app.trees.public);
  },

  contentFor(type) {
    if (type === 'head-footer') {
      return `<script src="/assets/eh-images.js"></script>`;
    }

    return '';
  },
};
