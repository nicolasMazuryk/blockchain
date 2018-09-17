const coins = {
  BTC: 'BTC',
  ETH: 'ETH',
};

const derivationPath = {
  [coins.BTC]: "m/44'/0'/0'/0",
  [coins.ETH]: "m/44'/60'/0'/0",
};

module.exports = {
  coins,
  derivationPath,
};
