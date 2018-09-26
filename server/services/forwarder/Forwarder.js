const web3 = require('../../../web3');
const util = require('ethereumjs-util');
const db = require('../../db');

const TX = require('../../libs/transaction');
const { Forwarder } = require('../../libs/forwarder');

async function createForwarder(req, res) {
  const instance = await Forwarder.deployContract();
  const nonce = await TX.getNonceETH(instance.address);
  const addressHex = util.generateAddress(instance.address, nonce).toString('hex');
  const address = `0x${addressHex}`;

  await instance.createForwarder({ from: web3.eth.accounts[0], gas: 500000 });

  const forwarder = Forwarder.createForwarder(address);
  const data = { nonce, forwarder: forwarder.address };
  const forwarders = await db.ETH.forwarder.get();

  forwarders.push(data);
  db.ETH.forwarder.set(forwarders);

  return res.json(data);
}

module.exports = createForwarder;