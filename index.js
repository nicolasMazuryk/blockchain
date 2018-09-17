const { runner } = require('./server/app');
const logger = require('./server/logger');

try {
  runner();
} catch(error) {
  logger.error(error);
}