const { ethers } = require('ethers');

// 初始化本地网络节点
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

const getTransaction = async (hash) => {
  try {
    const transaction = await provider.getTransaction(hash);
    return transaction;
  } catch (error) {
    throw new Error('getTransaction failed.');
  }
};

module.exports = {
  getTransaction,
};
