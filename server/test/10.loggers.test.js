'use strict';

require('should');
const request = require('supertest');

const lib = require('../lib');
const app = lib.app;

describe('The loggers', () => {
  let logger;

  before((done) => {
    app.boot(done);
  });

  it('should be there', () => {
    lib.should.have.property('logger').which.is.Function();
    lib.should.have.property('loggers').which.is.Object();
  });

  describe('The debug', () => {
    it('should be there', () => {
      lib.loggers.should.have.property('debug').which.is.Function();
    });

    it('can build a logger', () => {
      logger = lib.logger('debug');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
    });

    it('can output', () => {
      logger.info('lorem');
    });

    it('can output', () => {
      logger.info({});
    });

    it('can output', () => {
      logger.info('lorem', {});
    });
  });

  describe('The ringbuffer', () => {
    let ringbuffer;

    beforeEach(() => {
      if (ringbuffer) {
        ringbuffer.records = [];
      }
    });

    it('should be there', () => {
      lib.loggers.should.have.property('ringbuffer').which.is.Function();
    });

    it('can build a logger', () => {
      logger = lib.logger('ringbuffer');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
      logger.should.have.property('streams').which.is.Array().with.length(1);
      ringbuffer = logger.streams[0].stream;
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info('lorem');
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info({});
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info('lorem', {});
      ringbuffer.records.should.be.Array().with.length(1);
    });
  });

  describe('The syslog', () => {
    it('should be there', () => {
      lib.loggers.should.have.property('syslog').which.is.Function();
    });

    it('can build a logger', () => {
      logger = lib.logger('syslog');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
    });

    it('can output', () => {
      logger.info('lorem');
    });

    it('can output', () => {
      logger.info({});
    });

    it('can output', () => {
      logger.info('lorem', {});
    });
  });

  describe('The global logger', () => {
    it('should be there', () => {
      app.should.have.property('logger').which.is.Object();
      app.logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      app.logger.info(new Error('lorem'));
    });

    it('can output', () => {
      app.logger.info('lorem');
    });

    it('can output', () => {
      app.logger.info({});
    });

    it('can output', () => {
      app.logger.info('lorem', {});
    });
  });

  describe('The middleware', () => {
    it('can output', () => {
      return request(app)
        .get('/api/test')
        .set('Accept', 'application/json')
        .expect(204);
    });

    it('can output', () => {
      return request(app)
        .get('/api/test/404')
        .set('Accept', 'application/json')
        .expect(404);
    });
  });
});
