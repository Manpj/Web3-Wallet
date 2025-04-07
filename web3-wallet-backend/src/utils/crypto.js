const { ethers } = require('ethers');
const crypto = require('crypto');
const fs = require('fs-extra');
require('dotenv').config();

const ENCRYPTION_PASSWORD = process.env.PASSWORD;

// 工具函数：加密私钥
function encryptPrivateKey(privateKey, password) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    crypto.scryptSync(password, 'salt', 32),
    Buffer.alloc(16, 0)
  );
  const encrypted = Buffer.concat([
    cipher.update(privateKey, 'utf8'),
    cipher.final(),
  ]);
  return encrypted.toString('hex');
}

// 工具函数：解密私钥
function decryptPrivateKey(encryptedKey, password) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    crypto.scryptSync(password, 'salt', 32),
    Buffer.alloc(16, 0)
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedKey, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}

// 功能 1: 创建新钱包并加密私钥
async function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  console.log('新钱包地址：', wallet.address);
  console.log('助记词：', wallet.mnemonic.phrase);

  // 加密私钥
  const encryptedKey = encryptPrivateKey(
    wallet.privateKey,
    ENCRYPTION_PASSWORD
  );
  console.log('加密后的私钥：', encryptedKey);

  // 将加密的私钥和助记词保存到文件
  await fs.writeFile(
    'wallet-backup.json',
    JSON.stringify({ encryptedKey, mnemonic: wallet.mnemonic.phrase }, null, 2)
  );
  console.log('钱包备份已保存到 wallet-backup.json');

  return { address: wallet.address, mnemonic: wallet.mnemonic.phrase };
}

// 功能 2: 从备份恢复钱包
async function restoreWallet() {
  // 读取备份文件
  const data = JSON.parse(await fs.readFile('wallet-backup.json', 'utf8'));
  const decryptedKey = decryptPrivateKey(
    data.encryptedKey,
    ENCRYPTION_PASSWORD
  );
  const wallet = new ethers.Wallet(decryptedKey);
  console.log('钱包已恢复！');
  console.log('地址：', wallet.address);
  console.log('助记词：', data.mnemonic);
  return { address: wallet.address, mnemonic: data.mnemonic };
}

// 功能 3: 验证助记词恢复功能
async function recoverWalletFromMnemonic(mnemonic) {
  try {
    console.info('recoverWalletFromMnemonic', mnemonic);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log('使用助记词恢复的地址：', wallet.address);
    return { address: wallet.address };
  } catch (error) {
    console.info(error)
    throw new Error('recoverWalletFromMnemonic error.');
  }
}

module.exports = {
  createWallet,
  restoreWallet,
  recoverWalletFromMnemonic,
};
