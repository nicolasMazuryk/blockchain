const TX = require('../../libs/transaction');
const { Forwarder } = require('../../libs/forwarder');

const db = require('../../db');

async function InputsETH(req, res) {
  const address = await Forwarder.getContractAddress();

  const inputs = await TX.getInputsETH(address);

  await db.ETH.inputs.set(inputs);

  return res.json(inputs);
}

module.exports = InputsETH;