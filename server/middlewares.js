const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = {
  cors: cors({ origin: '*' }),
  urlencoded: bodyParser.urlencoded({ extended: false }),
  json: bodyParser.json(),
};
