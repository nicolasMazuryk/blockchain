const http = require('http');

const express = require('express');

const logger = require('./logger');
const config = require('../config');

const middlewares = require('./middlewares');
const router = require('./router');

const app = express();
const server = http.Server(app);

app.use(middlewares.cors);
app.use(middlewares.urlencoded);
app.use(middlewares.json);

app.use('/api/v1', router);
app.use(router);

function runner() {
  const { host, port } = config.server;

  server.listen(port, host, () => {
    logger.info('Express Server:', `${host}:${port}`);
  });
}

module.exports = app;
module.exports.runner = runner;
module.exports.server = server;
