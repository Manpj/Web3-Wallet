const express = require('express');
const router = express.Router();
const erc20Service = require('../services/erc20Service');
const commonService = require('../services/commonService');

// 获取ERC20余额
router.post('/balance', async (req, res) => {
  const { address, contractAddress } = req.body;
  try {
    const balance = await erc20Service.getBalance(address, contractAddress);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 发送ERC20交易
router.post('/send', async (req, res) => {
  const { to, amount, contractAddress } = req.body;
  try {
    const transaction = await erc20Service.send(to, amount, contractAddress);
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取ERC20代币信息
router.get('/info/:address', async (req, res) => {
  try {
    const info = await erc20Service.getInfo(req.params.address);
    res.json({ info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取ERC20代币信息
router.get('/listen/:address', async (req, res) => {
  try {
    const result = await erc20Service.listen(req.params.address);
    res.json({ result });
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

module.exports = router;
