const { ethers } = require('ethers');

// 初始化本地网络节点
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

const privateKey = process.env.PRIVATE_KEY;

const ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

// 获取钱包余额
const getBalance = async (address, contractAddress) => {
  const erc20Abi = ['function balanceOf(address owner) view returns (uint256)'];
  try {
    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);
    const balance = await contract.balanceOf(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch balance.');
  }
};

// 发起ERC20交易
const send = async (to, amount, contractAddress) => {
  try {
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const decimals = await contract.decimals(); // 获取代币精度
    const formattedAmount = ethers.parseUnits(amount, decimals);

    const transaction = await contract.transfer(to, formattedAmount);
    await transaction.wait(); // 等待交易被确认

    return transaction;
  } catch (error) {
    throw new Error('Transaction failed.');
  }
};

const getInfo = async (contractAddress) => {
  try {
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();
    console.log('代币名称:', name);
    console.log('代币符号:', symbol);
    console.log('小数位数:', decimals);
    console.log('总供应量:', ethers.formatUnits(totalSupply, decimals));

    return {
      name,
      symbol,
      decimals: String(decimals),
      totalSupply: ethers.formatUnits(totalSupply, decimals),
    };
  } catch (error) {
    throw new Error('get infomation failed.');
  }
};

const listen = async (contractAddress) => {
  try {
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    contract.on('Transfer', (from, to, value, event) => {
      console.log(
        `Transfer detected: From ${from} To ${to} Value ${ethers.formatUnits(
          value
        )}`
      );
    });
    console.log('开始监听 Transfer 事件...');
    return {status: 'success'}
  } catch (error) {
    console.info(error)
    throw new Error('listen failed.');
  }
};

module.exports = {
  send,
  getInfo,
  getBalance,
  listen,
};
