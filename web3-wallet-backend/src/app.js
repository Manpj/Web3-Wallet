const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const walletRoutes = require('./routes/wallet');
const blockRoutes = require('./routes/block');
const ethRoutes = require('./routes/eth');
const erc20Routes = require('./routes/erc20');

const app = express();

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/wallet', walletRoutes);
app.use('/api/block', blockRoutes);
app.use('/api/eth', ethRoutes);
app.use('/api/erc20', erc20Routes);

// 测试路由
app.get('/', (req, res) => {
  res.send('Web3 Wallet Backend is running.');
});

module.exports = app;
