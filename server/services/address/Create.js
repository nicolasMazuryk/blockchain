const db = require('../../db');
const Wallet = require('../../libs/wallet');
const Address = require('../../libs/address');


async function generate(req, res) {
  const { coin } = req.params;
  const stored = await db[coin].address.get();
  const index = stored.length;
  const publicKeys = await db[coin].publicKey.get();
  const keys = publicKeys.map(key => Wallet.derivePublicKey(key, index));

  const addresses = Address[`generateAddress${coin}`](keys);
  const data = { index, addresses };

  stored.push(data);
  await db[coin].address.set(stored);

  return res.send(data);
}

module.exports = generate;
