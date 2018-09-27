const Address = require('../../libs/address');
const db = require('../../db');

async function BalanceBTC(req, res) {

  const stored = await db.BTC.address.get();

  const addresses = stored.reduce((acc, { address }) => acc.concat(address), []);

  const balances = await Promise.all(addresses.map(Address.getBalanceBTC));

  const balance = balances.reduce((acc, balance) => acc + +balance, 0);

  return res.json(balance);
}

module.exports = BalanceBTC;