const bcoin = require('bcoin');
const ethereumUtil = require('ethereumjs-util');
const { rootDir, readFileAsync, writeFileAsync, toChecksumAddress } = require('../../utils');
const HDPublicKey = bcoin.hd.PublicKey;
const Script = bcoin.Script;
const KeyRing = bcoin.KeyRing;


const { network } = require('../../../config');

async function generate(req, res) {
  const { coin } = req.params;
  const { index } = req.body;
  const publicKeysJSON = await readFileAsync(`${rootDir}/database/pub_keys_${coin}.json`, 'utf8');
  const publicKeys = JSON.parse(publicKeysJSON);
  const keys = publicKeys.map(key => HDPublicKey.fromBase58(key, network).derive(index).toPublic().publicKey);

  const addresses = coin === 'BTC' ? generateAddressBTC(keys) : generateAddressETH(keys);
  const response = {
    index,
    ...addresses,
  };
  await writeFileAsync(`${rootDir}/database/address_${coin}_${index}.json`, JSON.stringify(response), 'utf8');

  return res.send(response);
}

module.exports = generate;

function generateAddressBTC(publicKeys) {
  const oldAddress = Script.fromMultisig(2, publicKeys.length, publicKeys).getAddress().toBase58(network);

  const keyRings = publicKeys.map(publicKey => {
    const keyRing = KeyRing.fromPublic(publicKey);
    keyRing.witness = true;
    return keyRing;
  });

  const pubkeys = keyRings.map(ring => ring.publicKey);
  const multiSigScript = Script.fromMultisig(2, pubkeys.length, pubkeys);

  keyRings[0].script = multiSigScript;
  const address = keyRings[0].getAddress().toString();
  const nestedAddress = keyRings[0].getNestedAddress().toString();
  return { oldAddress, address, nestedAddress };
}

function generateAddressETH(publicKeys) {
  const addresses = publicKeys.map(publicKey => {
    // const derived = publicKey.derive(index);
    let address = ethereumUtil.publicToAddress(publicKey, true);
    address = `0x${address.toString('hex')}`;

    return toChecksumAddress(address);
  });

  return { addresses };
}