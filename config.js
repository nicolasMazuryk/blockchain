module.exports = {
  server: {
    name: 'blockchain',
    port: 5000,
    host: 'localhost',
  },
  network: 'main',
  nodes: [
    {
      "host": "electrum.festivaldelhumor.org",
      "port": 50002
    },
    {
      "host":"bitcoin-node.org",
      "port": 50002
    },
    {
      "host": "electrum.qtornado.com",
      "port": 50002
    }
  ],
  providerUrl: 'http://127.0.0.1:7545',
};