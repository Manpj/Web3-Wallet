const express = require('express');
const router = express.Router();
const ethService = require('../services/ethService');
const commonService = require('../services/commonService');

// 获取ETH余额
router.get('/balance/:address', async (req, res) => {
  try {
    const balance = await ethService.getBalance(req.params.address);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 发送ETH交易
router.post('/send', async (req, res) => {
  const { to, amount } = req.body;
  try {
    const transaction = await ethService.sendTransaction(
      to,
      amount
    );
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取交易信息
router.get('/transaction/:hash', async (req, res) => {
  const { hash } = req.params;
  try {
    if (!hash) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const blockLatest = await commonService.getTransaction(hash);
    res.json({ blockLatest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * /balance/:address
 * /send
 * /transaction/:hash
 */
module.exports = router;
