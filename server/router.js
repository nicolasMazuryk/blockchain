const express = require('express');
const router = express.Router();


const keygenService = require('./services/keygen/KeyGen');
const listKeysService = require('./services/keygen/List');
const generateAddressService = require('./services/address/Create');
const listAddressService = require('./services/address/List');
const balanceService = require('./services/balance/Balance');
const inputsService = require('./services/inputs/Inputs');
const forwarderService = require('./services/forwarder/Forwarder');


router.get('/keygen/:coin', keygenService);
router.get('/keygen/list/:coin', listKeysService);
router.get('/address/:coin', listAddressService);
router.post('/address/:coin', generateAddressService);
router.get('/balance/:coin', balanceService);
router.get('/inputs/:coin/:address', inputsService);
router.get('/forwarder', forwarderService);

router.use('*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = router;
