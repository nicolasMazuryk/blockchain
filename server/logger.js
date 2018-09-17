const { createLogger, stdSerializers } = require('bunyan');

const config = require('../config');

const logger = createLogger({
  name: config.server.name,
  serializers: {
    err: stdSerializers.err,
  },
});

// module.exports = logger;

module.exports = console;