const { ethers, Wallet } = require('ethers');
const { generateWallet } = require('../utils');
const { writeFileSync, readFileSync } = require('fs');

// 初始化 Infura 提供商
// const provider = new ethers.InfuraProvider(
//   'sepolia',
//   process.env.INFURA_API_KEY
// );

// 初始化本地网络节点
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

const getBlockNumber = async () => {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Current Block Number:', blockNumber);
    return blockNumber;
  } catch (error) {
    console.error(error);
    throw new Error('getBlockNumber failed.');
  }
};

const getBlockLatest = async () => {
  try {
    const block = await provider.getBlock('latest');
    return block;
  } catch (error) {
    throw new Error('getBlockLatest failed.');
  }
};

module.exports = {
  getBlockNumber,
  getBlockLatest,
};
