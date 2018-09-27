const TX = require('../../libs/transaction');
const db = require('../../db');

async function InputsBTC(req, res) {
  const stored = await db.BTC.address.get();

  const addresses = stored.reduce((acc, { address }) => acc.concat(address), []);

  const inputsList = await Promise.all(addresses.map(TX.getInputsBTC));

  const inputs = [].concat(...inputsList);

  await db.BTC.inputs.set(inputs);

  return res.json(inputs);
}

module.exports = InputsBTC;