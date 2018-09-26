const Address = require('../../libs/address');
const db = require('../../db');

async function Balance(req, res) {
  const { coin } = req.params;

  const stored = await db[coin].address.get();

  const addresses = stored.reduce((acc, { addresses }) => acc.concat(addresses), []);

  const balances = await Promise.all(addresses.map(Address[`getBalance${coin}`]));

  const balance = balances.reduce((acc, balance) => acc + +balance, 0);

  return res.json(balance);
}

module.exports = Balance;