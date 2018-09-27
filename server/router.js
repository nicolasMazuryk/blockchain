const express = require('express');
const router = express.Router();


const keygen = require('./services/keygen/KeyGen');
const listKeys = require('./services/keygen/List');
const createBTCAddress = require('./services/address/CreateBTC');
const createETHAddress = require('./services/address/CreateETH');
const generateETHAddress = require('./services/address/GenerateETH');
const listAddresses = require('./services/address/List');
const balanceBTC = require('./services/balance/BalanceBTC');
const balanceETH = require('./services/balance/BalanceETH');
const inputsBTC = require('./services/inputs/InputsBTC');
const inputsETH = require('./services/inputs/InputsETH');

router.get('/keygen/:coin', listKeys);
router.post('/keygen/:coin', keygen);

router.get('/address/:coin', listAddresses);
router.post('/address/BTC', createBTCAddress);
router.post('/address/ETH', createETHAddress);
router.post('/address/ETH/generate', generateETHAddress);

router.get('/balance/BTC', balanceBTC);
router.get('/balance/ETH', balanceETH);

router.get('/inputs/BTC', inputsBTC);
router.get('/inputs/ETH', inputsETH);

router.use('*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = router;
