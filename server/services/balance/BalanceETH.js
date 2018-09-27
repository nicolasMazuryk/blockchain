const Address = require('../../libs/address');
const { Forwarder } = require('../../libs/forwarder');

async function BalanceETH(req, res) {
  const address = await Forwarder.getContractAddress();

  const balance = await Address.getBalanceETH(address);

  return res.json(balance);
}

module.exports = BalanceETH;