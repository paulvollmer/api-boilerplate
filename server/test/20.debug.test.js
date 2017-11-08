'use strict';

require('should');

const lib = require('../lib');
const app = lib.app;

describe('The debug', () => {
  let debug;

  before((done) => {
    app.boot(done);
  });

  it('should be there', () => {
    lib.should.have.property('debug').which.is.Function();
  });

  describe('An instance with no options', () => {
    it('can build a debug function', () => {
      debug = lib.debug();
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });

  describe('An instance with a default message', () => {
    it('can build a debug function', () => {
      debug = lib.debug('default message');
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });
});
