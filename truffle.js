var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = '[REDACTED]';

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
      gas: 8000000,
      gasPrice: 41000000000,
    },
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
