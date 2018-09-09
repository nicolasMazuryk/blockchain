const electrumClient = require('electrum-client');
const config = require('./config');

class Electrum {
  constructor() {
    this.electrum = null;
  }

  getRandomNode() {
    const nodes = config.nodes;
    return nodes[Math.floor(Math.random() * nodes.length)];
  }

  async connect() {
    if (this.electrum) return this.electrum;
    const node = this.getRandomNode();
    this.electrum = new electrumClient(node.port, node.host, 'tls');

    try {
      await this.electrum.connect()
    } catch (err) {
      console.error(`Fail to connect to Electrum Server ${node.host}:${node.port} . Reconnecting...`);
      this.electrum = null;
      return this.connect();
    }
  }

  async getUtxos(scriptHash) {
    await this.connect();
    return this.electrum.blockchainScripthash_listunspent(scriptHash);
  }

  async getTX(txHash) {
    await this.connect();
    return this.electrum.blockchainTransaction_get(txHash);
  }
}

module.exports = new Electrum();