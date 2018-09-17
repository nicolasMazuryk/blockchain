const bcoin = require('bcoin');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const Electrum = require('../../../electrumx');
const { Output } = bcoin.primitives;


async function Inputs(req, res) {
  const address = req.params.address;
  const output = Output.fromScript(address, 10000);
  const rawScript = output.script.toRaw();

  let scriptHash = crypto.createHash('sha256').update(rawScript).digest();
  scriptHash = reverse(scriptHash).toString('hex');

  const utxos = await Electrum.getUtxos(scriptHash);

  const inputs = [];
  for (const utxo of utxos) {
    const rawTx = await Electrum.getTX(utxo.tx_hash);
    inputs.push({
      rawTx,
      ...utxo,
      address,
      index: utxo.tx_pos,
    })
  }

  return res.json({ inputs });
}

module.exports = Inputs;