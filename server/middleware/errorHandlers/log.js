'use strict';

const logger = require('express-bunyan-logger');

const lib = require('../../lib');

module.exports = function(options) {
  return logger.errorLogger({
    logger: lib.logger(options),
    immediate: false,
    genReqId: lib.getTransactionId, // @see middleware/traceLog.js
    levelFn
  });
};

function levelFn(status, err) {
  if (status >= 500) {
    return 'error';
  } else if (status >= 400) {
    return 'warn';
  }
  return 'info';
}
