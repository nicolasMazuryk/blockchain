const bcoin = require('bcoin');
const fs = require('fs');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const { promisify } = require('util');

const Electrum = require('./electrumx');

const KeyRing = bcoin.KeyRing;
const Script = bcoin.Script;
const Mnemonic = bcoin.hd.Mnemonic;
const HD = bcoin.hd;
const HDPrivateKey = bcoin.hd.PrivateKey;
const HDPublicKey = bcoin.hd.PublicKey;
const { Output } = bcoin.primitives;

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const network = 'main';

const rootDir = __dirname;

const phrase1 = 'affair client someone wave squeeze survey cook tunnel peace mule speak exist mixed grow whip rival jeans dynamic tongue force sure round merit similar';

class KeyGen {

  static generateMnemonic(bits) {
    return new Mnemonic({ bits })
  }

  static getMasterKeyFromMnemonic(phrase) {
    const mnemonic = new Mnemonic(phrase);
    return HD.fromMnemonic(mnemonic);
  }

  static getPublicKeyFromPrivateKey(privateKey) {
    return privateKey.toPublic();
  }

  static async getAddress(index) {
    const publicKeysJSON = await readFileAsync(`${rootDir}/public_keys.json`, 'utf8');
    const publicKeys = JSON.parse(publicKeysJSON);
    const keys = publicKeys.map(key => HDPublicKey.fromBase58(key, network).derive(index).toPublic().publicKey);

    return Script.fromMultisig(2, keys.length, keys).getAddress().toBase58(network);

    // const keyRing = KeyRing.fromPublic(publicKey.publicKey);
    // keyRing.witness = true;
    // const address = keyRing.getAddress('string', network);
    // return address;
  }

  static async getSegwitAddress(index) {
    const publicKeysJSON = await readFileAsync(`${rootDir}/public_keys.json`, 'utf8');
    const publicKeys = JSON.parse(publicKeysJSON);
    const keyRings = publicKeys.map(key => {
      const publicKey = HDPublicKey.fromBase58(key, network).derive(index).toPublic().publicKey;
      const keyRing = KeyRing.fromPublic(publicKey);
      keyRing.witness = true;
      return keyRing;
    });

    const pubkeys = keyRings.map(ring => ring.publicKey);
    const multisigScript = Script.fromMultisig(2, pubkeys.length, pubkeys);

    keyRings[0].script = multisigScript;
    const address = keyRings[0].getAddress().toString();
    const nestedAddress = keyRings[0].getNestedAddress().toString();
    return { address, nestedAddress };
  }

  static async getUtxos(address) {
    const scriptHash = getScriptHash(address);
    const utxos = await Electrum.getUtxos(scriptHash);
    const txInputs = [];
    for (const utxo of utxos) {
      const rawTx = await Electrum.getTX(utxo.tx_hash);
      txInputs.push({
        rawTx,
        ...utxo,
        address,
        index: utxo.tx_pos,
      })
    }
    return txInputs;
  }
}



async function generateAddresses(index) {
  const oldAddress = await KeyGen.getAddress(index);
  const { address, nestedAddress } = await KeyGen.getSegwitAddress(index);
  console.log({ index, oldAddress, address, nestedAddress });
  return { index, addresses: [oldAddress, address, nestedAddress] };
}

function getScriptHash(address) {
  const output = Output.fromScript(address, 10000);
  const rawScript = output.script.toRaw();

  const scriptHash = crypto.createHash('sha256').update(rawScript).digest();
  return reverse(scriptHash).toString('hex');
}


(async () => {
  try {
    const { index, addresses } = await generateAddresses(1);
    const inputs = await Promise.all(addresses.map(address => KeyGen.getUtxos(address)));
    console.log(inputs);
  } catch (err) {
    console.log(err);
  }
})();
