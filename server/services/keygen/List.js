const db = require('../../db');

async function List(req, res) {
  const { coin } = req.params;
  const stored = await db[coin].publicKey.get();

  return res.send(stored);
}

module.exports = List;
