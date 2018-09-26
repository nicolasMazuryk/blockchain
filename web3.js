const Web3 = require('web3');
const { providerUrl } = require('./config');

const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

module.exports = web3;