const truffleContract = require('truffle-contract');

const web3 = require('../../web3');
const { root } = require('../utils');

const walletSimpleJSON = require(`${root}/build/contracts/WalletSimple`);
const forwarderJSON = require(`${root}/build/contracts/Forwarder`);

const walletContract = truffleContract(walletSimpleJSON);
const forwarderContract = truffleContract(forwarderJSON);

walletContract.setProvider(web3.currentProvider);

class Forwarder {
  constructor() {
    this.instance = null;
  }

  async deployContract() {
    if (!this.instance) {
      this.instance = await walletContract.deployed();
    }
    return this.instance;
  }

  createForwarder(address) {
    return forwarderContract.at(address);
  }

  async getContractAddress() {
    if (this.instance) return this.instance.address;
    await this.deployContract();
    return this.instance.address;
  }
}

module.exports.Forwarder = new Forwarder();
module.exports.walletSimpleJSON = walletSimpleJSON;
