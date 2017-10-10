'use strict';

/**
 * disable all remote methods of a model
 *
 * @param {Object} model - the model object
 * @param {array<string>} allowedMethods - list of allowed remote method names
 * @return {undefined}
 */
module.exports = function disableRemoteMethods(model, allowedMethods = []) {
  model.sharedClass.methods().forEach(method => {
    if (allowedMethods.indexOf(method.name) < 0) {
      if (method.isStatic) {
        model.disableRemoteMethodByName(method.name);
      } else {
        model.disableRemoteMethodByName('prototype.' + method.name);
      }
    }
  });
};
