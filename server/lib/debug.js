'use strict';

const debug = require('debug');
const sliced = require('sliced');
const lib = require('./');
const app = lib.app;

/**
 * Build a debug function.
 *
 * As a best practice, the first argument to the debug functions should always be a message string.
 * If a `defaultMessage` is given here it will be used when the first argument is not a string.
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  } else if (typeof options === 'string') {
    options = { defaultMessage: options };
  }

  // Will only be used when the `app` is not booted.
  const toConsole = debug(app.get('namespace'));

  return function() {
    const args = sliced(arguments);
    if (options.defaultMessage != null && typeof args[0] !== 'string') {
      args.unshift(options.defaultMessage);
    }
    if (app.logger == null) {
      return toConsole.apply(this, args);
    }
    // TODO: configurable level?
    return app.logger.debug.apply(app.logger, args);
  };
};
