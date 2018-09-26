const bcoin = require('bcoin');
const { derivationPath, coins } = require('../constants');
const HD = bcoin.hd;
const Mnemonic = HD.Mnemonic;
const HDPublicKey = HD.PublicKey;

const { network } = require('../../config');

class Wallet {

  generateMnemonic(number) {
    return new Array(number).fill().map(() => new Mnemonic({ bits: 256 }).getPhrase());
  }

  getPublicKeysFromMnemonicPhrase(phrase, coin = coins.BTC) {
    const mnemonic = Mnemonic.fromPhrase(phrase);
    const masterKey = HD.fromMnemonic(mnemonic);
    const derivedPrivate = masterKey.derivePath(derivationPath[coin]);
    const publicKey = derivedPrivate.toPublic();

    return publicKey.toJSON().xpubkey;
  }

  derivePublicKey(key, index) {
    return HDPublicKey.fromBase58(key, network).derive(index).toPublic().publicKey;
  }
}

module.exports = new Wallet();