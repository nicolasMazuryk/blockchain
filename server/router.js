const express = require('express');
const router = express.Router();


const keygenService = require('./services/keygen/KeyGen');
const generateAddressService = require('./services/address/GenerateAddress');
const balanceService = require('./services/balance/Balance');
const inputsService = require('./services/inputs/Inputs');


router.get('/keygen/:coin', keygenService);
router.post('/address/:coin', generateAddressService);
router.get('/balance/:address', balanceService);
router.get('/inputs/:address', inputsService);

router.use('*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = router;
