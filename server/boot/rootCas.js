'use strict';

const https = require('https');
const rootCas = require('ssl-root-cas').create();

/**
 * A general best practice, for how a root CA file should be used.
 */
module.exports = function(app) {
  const rootCaFile = app.get('rootCaFile');
  if (rootCaFile) {
    rootCas.addFile(rootCaFile);
  }
  https.globalAgent.options.ca = rootCas;
};
