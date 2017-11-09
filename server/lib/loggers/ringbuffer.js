'use strict';

const Logger = require('bunyan-logger');

// Singleton.
const logger = new Logger({ stream: 'ringbuffer' });

module.exports = function() {
  return logger;
};
