const TX = require('../../libs/transaction');
const db = require('../../db');

async function Inputs(req, res) {
  const { coin, address } = req.params;

  const inputs = await TX[`getInputs${coin}`](address);

  await db[coin].inputs.set(inputs);

  return res.json(inputs);
}

module.exports = Inputs;