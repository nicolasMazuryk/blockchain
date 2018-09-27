const bcoin = require('bcoin');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const web3 = require('../../web3');
const db = require('../db');
const Electrum = require('../../electrumx');
const { toChecksumAddress } = require('../utils');
const { Output } = bcoin.primitives;

const { Forwarder, walletSimpleJSON } = require('./forwarder');

class Transaction {
  constructor() {
    this.getInputsBTC = this.getInputsBTC.bind(this);
  }

  async getUtxos(address) {
    const output = Output.fromScript(address, 10000);
    const rawScript = output.script.toRaw();

    let scriptHash = crypto.createHash('sha256').update(rawScript).digest();
    scriptHash = reverse(scriptHash).toString('hex');

    return Electrum.getUtxos(scriptHash);
  }

  async getInputsBTC(address) {
    const utxos = await this.getUtxos(address);

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
    return inputs;
  }

  async getInputsETH(address) {
    const nonce = await this.getNonceETH(address);
    const contract = walletSimpleJSON;
    const balance = await +web3.fromWei(+web3.eth.getBalance(address).toString());
    const stored = await db.ETH.initial.get();

    const fromAddress = Forwarder.instance.contract._eth.accounts[0];

    const { index } = stored.find(a => a.address === toChecksumAddress(fromAddress)) || {};
    const addresses = stored.filter(a => a.index === index);

    return { nonce, contract, balance, addresses }
  }

  async getNonceETH(address) {
    return web3.eth.getTransactionCount(address);
  }
}

module.exports = new Transaction();
