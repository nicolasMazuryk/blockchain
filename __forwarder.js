const Web3 = require('web3');
const truffleContract = require('truffle-contract');
const util = require('ethereumjs-util');
const BN = require('bignumber.js');
const logger = require('./server/logger');

const providerUrl = "http://127.0.0.1:7545";
const walletSimpleJSON = require('./build/contracts/WalletSimple');
const forwarderJSON = require('./build/contracts/Forwarder');

const walletContract = truffleContract(walletSimpleJSON);
const forwarderContract = truffleContract(forwarderJSON);

const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

walletContract.setProvider(web3.currentProvider);

const fromAddress = '0xb57e5D5983cC0BEd24471d0a6EF2e1EA47376060';

(async() => {

  // const instance = await walletContract.deployed();
  // const nonce = await web3.eth.getTransactionCount(instance.address);
  // const addressHex = util.generateAddress(instance.address, nonce).toString('hex');
  // const address = `0x${addressHex}`;
  //
  // await instance.createForwarder({ from: web3.eth.accounts[0], gas: 500000 });
  //
  // const forwarder = forwarderContract.at(address);

  web3.eth.sendTransaction({
    from: fromAddress,
    to: '0x979659ed2ccb8c5af701b321a755cb186723e9ac',
    value: web3.toWei(0.002),
  });

  logger.info('contract balance:', web3.fromWei(+web3.eth.getBalance(instance.address).toString()));
  logger.info('forwarder balance:', web3.fromWei(+web3.eth.getBalance(forwarder.address).toString()));
  logger.info('*********');
})();