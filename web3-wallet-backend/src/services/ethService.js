const { ethers } = require('ethers');

// 初始化本地网络节点
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

// 获取钱包余额
const getBalance = async (address) => {
  try {
    const balance = await provider.getBalance(address);
    console.info(`address: ${address} balance:`, balance);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch balance.');
  }
};

// 发起交易
const sendTransaction = async (to, amount) => {
  const privateKey =  process.env.PRIVATE_KEY
  try {
    const signer = new ethers.Wallet(privateKey, provider);

    const tx = {
      to,
      value: ethers.parseEther(amount),
    };

    const transaction = await signer.sendTransaction(tx);
    return transaction;
  } catch (error) {
    throw new Error('Transaction failed.');
  }
};

module.exports = {
  getBalance,
  sendTransaction,
};
