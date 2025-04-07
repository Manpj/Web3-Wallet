require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.28',
  networks: {
    development: {
      url: 'http://127.0.0.1:7545',
      accounts: ['0x544c84250149e9b5797abef7ca30a17b089892913b37920eaa963fe6990f60d3'],
    },
  },
};
