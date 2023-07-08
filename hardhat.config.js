const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@openzeppelin/hardhat-upgrades');

const dotenv = require('dotenv').config();
const privateKey =
  'bbe6eea348414a135b3f76b98808b23de7810de85c1a47a18d6bc8084a81a78e';

task('accounts', 'Prints The List Of Accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    hardhat: {
      // See its defaults
    },
    patexSepolia: {
      url: 'https://test-rpc.patex.io',
      accounts: [privateKey],
      chainId: 471100,
      gas: 10000000, // Set the gas limit for transactions
      gasPrice: 5000000000, // Optional, for legacy transactions
      maxPriorityFeePerGas: 200000000, // 2 Gwei
      maxFeePerGas: 1000000000, // 10 Gwei
    },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // etherscan: {
  //   apiKey: {
  //     chiado: process.env.FANTOM_KEY,
  //   },
  // },
};
