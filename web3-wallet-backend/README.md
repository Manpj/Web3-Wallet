```
web3-wallet-backend/
├── src/
│   ├── controllers/       # 业务逻辑处理
│   ├── routes/            # API 路由
│   ├── services/          # 区块链服务
│   ├── config/            # 配置文件
│   ├── app.js             # Express 应用入口
│   └── server.js          # 服务启动脚本
├── .env                   # 环境变量文件
├── package.json           # 项目依赖配置
└── README.md              # 项目说明

## 启动
npx nodemon src/server.js   
