'use strict';

const httpError = require('http-errors');

module.exports = function(app) {
  const apiRoot = app.get('restApiRoot');

  app.get(apiRoot + '/test', (req, res) => {
    res.status(204).send();
  });

  app.get(apiRoot + '/test/404', (req, res, next) => {
    return next(httpError(404));
  });
};
