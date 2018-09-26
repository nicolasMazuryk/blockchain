const path = require('path');
const { readFileAsync, writeFileAsync, root } = require('./utils');

const store = fileName => {
  const pathName = path.resolve(root, `database`, `${fileName}.json`);

  return {
    get: async () => {
      try {
        return JSON.parse(await readFileAsync(pathName));
      } catch(e) {
        return []
      }
    },

    set: data => writeFileAsync(pathName, JSON.stringify(data, null, 2)),

    update: async data => {
      const collection = await this.get();
      collection.push(data);
      return this.set(collection);
    }
  }
};

module.exports = {
  BTC: {
    mnemonic: store('mnemonic_BTC'),
    publicKey: store('pub_keys_BTC'),
    address: store('address_BTC'),
    inputs: store('inputs_BTC'),
  },
  ETH: {
    mnemonic: store('mnemonic_ETH'),
    publicKey: store('pub_keys_ETH'),
    address: store('address_ETH'),
    inputs: store('inputs_ETH'),
    forwarder: store('forwarder_ETH'),
  },
};