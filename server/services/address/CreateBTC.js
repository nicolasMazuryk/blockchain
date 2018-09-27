const db = require('../../db');

const Wallet = require('../../libs/wallet');
const Address = require('../../libs/address');

async function CreateBTC(req, res) {
  const stored = await db.BTC.address.get();
  const index = stored.length ?
      Math.max(...stored.map(a => a.index), 0) + 1 :
      0;

  const publicKeys = await db.BTC.publicKey.get();
  const keys = publicKeys.map(key => Wallet.derivePublicKey(key, index));

  const addresses = Address.generateAddressBTC(keys);
  const data = addresses.map(address => ({ index, address }));

  await db.BTC.address.set([...stored, ...data]);

  return res.send(data);
}

module.exports = CreateBTC;
