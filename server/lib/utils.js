'use strict';

/**
 * disable all remote methods of a model
 *
 * @param {Object} model - the model object
 * @param {array<string>} excepts - list of allowed remote method names
 * @return {undefined}
 */
function disableAllRemoteMethods(model, excepts = []) {
  model.sharedClass.methods().forEach(method => {
    if (excepts.indexOf(method.name) < 0) {
      if (method.isStatic) {
        model.disableRemoteMethodByName(method.name);
      } else {
        model.disableRemoteMethodByName('prototype.' + method.name);
      }
    }
  });
}

module.exports.disableAllRemoteMethods = disableAllRemoteMethods;
