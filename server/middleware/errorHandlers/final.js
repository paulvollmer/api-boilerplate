'use strict';

const strongErrorHandler = require('strong-error-handler');

const lib = require('../../lib');
const debug = lib.debug('errorHandler');

/**
 * A simple wrapper, removes error stack in some cases.
 *
 * @param {Object} options
 * @return {Function}
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  const debugging = lib.vars.debugging(options.debug);

  // Always in debug mode and remove error stack in another way.
  const handleError = strongErrorHandler(Object.assign({
    log: false
  }, options, {
    debug: true
  }));

  return function errorHandler(err, req, res, next) {
    debug(err);
    if (!debugging) {
      delete err.stack;
    }

    // The strong-error-handler.
    return handleError(err, req, res, next);
  };
};
