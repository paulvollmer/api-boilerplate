'use strict';

const path = require('path');
const env = require('env-var');

/**
 * Environment variables, and constants.
 *
 * The idea: things in here would override all the other config files, so this is NOT considered the
 * place for default configs, but the `config.json` and the env-specific config files are.
 */
module.exports = {
  // Project.
  namespace: 'hello:%s',

  // Server.
  port: env('HELLO_PORT').asInt(),

  // Log.
  logStream: env('LOG_STREAM').asString(),
  syslogHost: env('SYSLOG_HOST').asString(),
  syslogPort: env('SYSLOG_PORT').asInt()
};
