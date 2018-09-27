const db = require('../../db');

const Wallet = require('../../libs/wallet');
const Address = require('../../libs/address');

async function GenerateETH(req, res) {
  const stored = await db.ETH.initial.get();
  const index = stored.length ?
      Math.max(...stored.map(a => a.index), 0) + 1 :
      0;

  const publicKeys = await db.ETH.publicKey.get();
  const keys = publicKeys.map(key => Wallet.derivePublicKey(key, index));

  const addresses = Address.generateAddressETH(keys);
  const data = addresses.map(address => ({ index, address }));

  await db.ETH.initial.set([...stored, ...data]);

  return res.send(data);
}

module.exports = GenerateETH;
