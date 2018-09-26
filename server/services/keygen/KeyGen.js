const db = require('./../../db');
const Wallet = require('./../../libs/wallet');

async function keyGen(req, res) {
  const { coin } = req.params;

  let phrases;
  phrases = await db[coin].mnemonic.get();

  if (!phrases.length) {
    phrases = Wallet.generateMnemonic(3);
    await db[coin].mnemonic.set(phrases);
  }

  const publicKeys = phrases.map(phrase => Wallet.getPublicKeysFromMnemonicPhrase(phrase, coin));
  await db[coin].publicKey.set(publicKeys);

  return res.json(publicKeys);
}

module.exports = keyGen;
