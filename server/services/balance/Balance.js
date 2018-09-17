const bcoin = require('bcoin');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const Electrum = require('../../../electrumx');
const { Output } = bcoin.primitives;


async function Balance(req, res) {
  const address = req.params.address;
  const output = Output.fromScript(address, 10000);
  const rawScript = output.script.toRaw();

  let scriptHash = crypto.createHash('sha256').update(rawScript).digest();
  scriptHash = reverse(scriptHash).toString('hex');

  const utxos = await Electrum.getUtxos(scriptHash);
  const balance = utxos.reduce((acc, tx) => acc + tx.value, 0);

  return res.json({ balance });
}

module.exports = Balance;