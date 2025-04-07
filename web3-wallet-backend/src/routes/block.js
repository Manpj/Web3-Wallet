const express = require('express');
const router = express.Router();
const blockchainService = require('../services/blockService');

// 获取区块高度
router.get('/number', async (req, res) => {
  try {
    const blockNumber = await blockchainService.getBlockNumber();
    res.json({ blockNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取最新区块信息
router.get('/latest', async (req, res) => {
  try {
    const blockLatest = await blockchainService.getBlockLatest();
    res.json({ blockLatest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
