const MultisigWallet = artifacts.require("WalletSimple");
const addressesETH = require('../database/initial_ETH.json');

const addresses = addressesETH.filter(a => a.index === 0);

module.exports = function(deployer) {
  deployer.deploy(MultisigWallet, addresses.map(a => a.address));
};