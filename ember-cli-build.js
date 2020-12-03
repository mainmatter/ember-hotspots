'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const assetRevDefaults = require('broccoli-asset-rev/lib/default-options');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    'ember-hotspots': {
      cwd: '/',
      prefetch: true,
      preload: true,
    },

    fingerprint: {
      extensions: [...assetRevDefaults.extensions, 'svg', 'json'],
      replaceExtensions: [...assetRevDefaults.replaceExtensions, 'json'],
      prepend: process.env.CI === 'production' ? '/ember-hotspots/' : '',
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
