const express = require('express');
const router = express.Router();
const walletService = require('../services/walletService');
const { readFileSync } = require('fs');

// 创建新钱包
router.post('/create', async (req, res) => {
  try {
    const wallet = await walletService.createWallet();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 导入钱包
router.post('/import', async (req, res) => {
  try {
    const wallet = await walletService.importWallet();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取地址
router.get('/address', async (req, res) => {
  try {
    const accountRawData = await readFileSync('account 2.json', 'utf8');
    const accountData = JSON.parse(accountRawData);
    res.json({ address: accountData.address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新钱包
router.post('/create-v2', async (req, res) => {
  try {
    const wallet = await walletService.createWalletV2()
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 从本地恢复钱包
router.post('/restore', async (req, res) => {
  try {
    const wallet = await walletService.restoreWallet()
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 从助记词恢复钱包
router.post('/recover', async (req, res) => {
  const { mnemonic } = req.body;
  try {
    const wallet = await walletService.recoverWalletFromMnemonic(mnemonic)
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
