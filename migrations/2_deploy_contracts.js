const MultisigWallet = artifacts.require("WalletSimple");
const addressesETH = require('../database/address_ETH.json');

const addresses = addressesETH[0].addresses;

module.exports = function(deployer) {
  deployer.deploy(MultisigWallet, addresses);
};