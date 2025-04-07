const { ethers, Wallet } = require('ethers');
const { generateWallet } = require('../utils');
const crypto = require('../utils/crypto');
const { writeFileSync, readFileSync } = require('fs');
require('dotenv').config();

const ENCRYPTION_PASSWORD = process.env.PASSWORD;

// 初始化 Infura 提供商
// const provider = new ethers.InfuraProvider(
//   'sepolia',
//   process.env.INFURA_API_KEY
// );

// 初始化本地网络节点
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

// 创建新钱包
const createWallet = async () => {
  // const wallet = ethers.Wallet.createRandom();
  // return {
  //   address: wallet.address,
  //   privateKey: wallet.privateKey,
  // };

  try {
    const wallet = await generateWallet();
    const accountOneData = JSON.stringify(wallet);
    writeFileSync('account 2.json', accountOneData);
    return wallet;
  } catch (error) {
    throw new Error('create wallet error.');
  }
};

const importWallet = async () => {
  try {
    const accountRawData = readFileSync('account 2.json', 'utf8');
    const accountData = JSON.parse(accountRawData);
    const privateKey = Object.values(accountData.privateKey);
    const signer = new Wallet(privateKey, provider);
    const transaction = await signer.sendTransaction({
      to: _receiverAddress,
      value: utils.parseEther(_ethAmount),
    });

    console.log(transaction);
    return accountData;
  } catch (error) {
    throw new Error('create wallet error.');
  }
};

const createWalletV2 = async () => {
  try {
    const wallet = await crypto.createWallet();
    return wallet;
  } catch (error) {
    throw new Error('create wallet error.');
  }
};

const restoreWallet = async () => {
  try {
    const wallet = await crypto.restoreWallet();
    return wallet;
  } catch (error) {
    throw new Error('restore wallet error.');
  }
};

const recoverWalletFromMnemonic = async (mnemonic) => {
  try {
    const wallet = await crypto.recoverWalletFromMnemonic(mnemonic);
    return wallet;
  } catch (error) {
    throw new Error('recover wallet error.');
  }
};

module.exports = {
  createWallet,
  importWallet,
  createWalletV2,
  restoreWallet,
  recoverWalletFromMnemonic,
};
