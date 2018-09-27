const bcoin = require('bcoin');
const ethereumUtil = require('ethereumjs-util');
const web3 = require('../../web3');
const { toChecksumAddress } = require('../utils');
const TX = require('./transaction');

const Script = bcoin.Script;

const KeyRing = bcoin.KeyRing;
const { network } = require('../../config');


class Address {

  generateAddressBTC(publicKeys) {

    const old = this.generateBTCAddressOld(publicKeys);
    const keyRings = this.getKeyRings(publicKeys);
    const addresses = this.generateBTCAddresses(keyRings);

    return [old, ...addresses];
  }

  generateAddressETH(publicKeys) {
    return publicKeys.map(key => {
      let address = ethereumUtil.publicToAddress(key, true);
      address = `0x${address.toString('hex')}`;

      return toChecksumAddress(address);
    });
  }

  generateBTCAddressOld(publicKeys) {
    return Script.fromMultisig(2, publicKeys.length, publicKeys).getAddress().toBase58(network)
  }

  generateBTCAddresses(keyRings) {
    const pubKeys = keyRings.map(ring => ring.publicKey);
    const multiSigScript = Script.fromMultisig(2, pubKeys.length, pubKeys);
    keyRings[0].script = multiSigScript;

    return [
      keyRings[0].getAddress().toString(), // SegWit address
      keyRings[0].getNestedAddress().toString(), // Nested address
    ];
  }

  getKeyRings(publicKeys) {
    return publicKeys.map(key => {
      const keyRing = KeyRing.fromPublic(key);
      keyRing.witness = true;
      return keyRing;
    })
  }

  async getBalanceBTC(address) {
    const utxos = await TX.getUtxos(address);
    return utxos.reduce((acc, tx) => acc + tx.value, 0);
  }

  async getBalanceETH(address) {
    return +web3.fromWei(+web3.eth.getBalance(address).toString())
  }
}

module.exports = new Address();