const util = require('ethereumjs-util');

const web3 = require('../../../web3');
const db = require('../../db');

const TX = require('../../libs/transaction');
const { Forwarder } = require('../../libs/forwarder');

async function CreateETH(req, res) {
  const stored = await db.ETH.address.get();

  const instance = await Forwarder.deployContract();
  const nonce = await TX.getNonceETH(instance.address);
  const addressHex = util.generateAddress(instance.address, nonce).toString('hex');
  const address = `0x${addressHex}`;

  await instance.createForwarder({ from: web3.eth.accounts[0], gas: 500000 });

  const forwarder = Forwarder.createForwarder(address);
  const data = [{ index: nonce, address: forwarder.address }];

  await db.ETH.address.set([...stored, ...data]);

  return res.send(data);
}

module.exports = CreateETH;
