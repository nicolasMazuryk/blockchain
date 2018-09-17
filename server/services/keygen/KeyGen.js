const bcoin = require('bcoin');
const { rootDir, readFileAsync, writeFileAsync } = require('../../utils');
const { derivationPath } = require('../../constants');
const HD = bcoin.hd;
const Mnemonic = bcoin.hd.Mnemonic;

async function keyGen(req, res) {
  const { coin } = req.params;

  let mnemonicPhrases;
  try {
    mnemonicPhrases = await readFileAsync(`${rootDir}/database/mnemonic_${coin}.json`, 'utf8');
    mnemonicPhrases = JSON.parse(mnemonicPhrases);
  } catch(err) {
    mnemonicPhrases = new Array(3).fill().map(() => new Mnemonic({ bits: 256 }).getPhrase());
    await writeFileAsync(`${rootDir}/database/mnemonic_${coin}.json`, JSON.stringify(mnemonicPhrases), 'utf8');
  }

  const publicKeys = mnemonicPhrases.map(phrase => {
    const mnemonic = Mnemonic.fromPhrase(phrase);
    const masterKey = HD.fromMnemonic(mnemonic);
    const derivedPrivate = masterKey.derivePath(derivationPath[coin]);
    const publicKey = derivedPrivate.toPublic();

    return publicKey.toJSON().xpubkey;
  });
  await writeFileAsync(`${rootDir}/database/pub_keys_${coin}.json`, JSON.stringify(publicKeys), 'utf8');

  return res.json(publicKeys);
}

module.exports = keyGen;