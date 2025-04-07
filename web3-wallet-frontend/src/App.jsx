import { useState } from 'react';
import './App.css';
import {
  createWallet,
  recoverWallet,
  restoreWallet,
  sendETH,
  sendERC20,
  getEthBalance,
  getERC20Balance,
} from './services/apiService';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [remnemonic, setReMnemonic] = useState('');
  const [wallet, setWallet] = useState(null);
  const [queryW, setQueryW] = useState('');
  const [resWallet, setResWallet] = useState(null);
  const [ethTx, setEthTx] = useState({ to: '', amount: 0 });
  const [erc20Tx, setErc20Tx] = useState({
    to: '',
    amount: 0,
    contractAddress: '',
  });
  const [message, setMessage] = useState('');

  const [ethBalance, setEthBalance] = useState(null);
  const [erc20Balance, setErc20Balance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const generateMnemonic = async () => {
    const newWallet = await createWallet();
    setMnemonic(newWallet.mnemonic);
    setWallet(newWallet);
  };

  const restoreWalletHandle = async () => {
    const resWallet = await restoreWallet();
    console.info('resWallet', resWallet);
    setReMnemonic(resWallet.mnemonic);
    setResWallet(resWallet);
  };

  const importMnemonic = async (inputMnemonic) => {
    try {
      const importedWallet = await recoverWallet(inputMnemonic);
      setWallet(importedWallet);
      setMessage('助记词导入成功！');
    } catch (error) {
      setMessage('无效的助记词！');
    }
  };

  const sendEthTransaction = async () => {
    if (!wallet || !ethTx.to || !ethTx.amount) {
      setMessage('请完整填写信息！');
      return;
    }
    try {
      const tx = await sendETH(ethTx);
      console.info(tx)
      setMessage(`交易成功，哈希：${tx?.transaction?.hash}`);
    } catch (error) {
      setMessage(`交易失败：${error.message}`);
    }
  };

  const sendErc20Transaction = async () => {
    if (!erc20Tx.to || !erc20Tx.amount || !erc20Tx.contractAddress) {
      setMessage('请完整填写信息！');
      return;
    }
    try {
      const tx = await sendERC20(erc20Tx);
      setMessage(`ERC-20 代币转账成功，哈希：${tx?.transaction?.hash}`);
    } catch (error) {
      setMessage(`ERC-20 转账失败：${error.message}`);
    }
  };

  const fetchETHBalance = async () => {
    try {
      if (!queryW) {
        setMessage('请完整填写信息！');
        return;
      }
      const result = await getEthBalance(queryW);
      console.info('fetchETHBalance', result)
      setEthBalance(result.balance);
    } catch (error) {
      console.error('Error fetching ERC-20 balance:', error);
    }
  };

  const fetchERC20Balance = async () => {
    try {
      const result = await getERC20Balance({
        address: queryW,
        contractAddress: erc20Tx.contractAddress,
      });
      setErc20Balance(result.balance);
    } catch (error) {
      console.error('Error fetching ERC-20 balance:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTransactions([]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  console.info('wallet', wallet)
  console.info('resWallet', resWallet);

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold text-center mb-6'>Web3 钱包</h1>

      <div className='bg-white shadow p-4 rounded-lg mb-6'>
        <h2 className='text-xl font-semibold mb-2'>生成或导入助记词</h2>
        <div className='flex flex-col space-y-4'>
          <button
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
            onClick={generateMnemonic}
          >
            生成助记词
          </button>
          {mnemonic && (
            <p className='bg-gray-100 p-2 rounded text-sm'>{mnemonic}</p>
          )}
          <input
            type='text'
            className='border p-2 rounded'
            placeholder='输入助记词'
            onBlur={(e) => importMnemonic(e.target.value)}
          />
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg mb-6'>
        <h2 className='text-xl font-semibold mb-2'>本地恢复钱包</h2>
        <div className='flex flex-col space-y-4'>
          <button
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
            onClick={restoreWalletHandle}
          >
            恢复钱包
          </button>
          {remnemonic && (
            <p className='bg-gray-100 p-2 rounded text-sm'>{remnemonic}</p>
          )}
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg mb-6'>
        <h2 className='text-xl font-semibold mb-2'>ETH 转账</h2>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            className='border p-2 rounded'
            placeholder='接收地址'
            onChange={(e) => setEthTx({ ...ethTx, to: e.target.value })}
          />
          <input
            type='number'
            className='border p-2 rounded'
            placeholder='转账金额 (ETH)'
            onChange={(e) => setEthTx({ ...ethTx, amount: e.target.value })}
          />
          <button
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            onClick={sendEthTransaction}
          >
            发送 ETH
          </button>
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg mb-6'>
        <h2 className='text-xl font-semibold mb-2'>ERC-20 代币转账</h2>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            className='border p-2 rounded'
            placeholder='合约地址'
            onChange={(e) =>
              setErc20Tx({ ...erc20Tx, contractAddress: e.target.value })
            }
          />
          <input
            type='text'
            className='border p-2 rounded'
            placeholder='接收地址'
            onChange={(e) => setErc20Tx({ ...erc20Tx, to: e.target.value })}
          />
          <input
            type='number'
            className='border p-2 rounded'
            placeholder='转账金额'
            onChange={(e) => setErc20Tx({ ...erc20Tx, amount: e.target.value })}
          />
          <button
            className='bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600'
            onClick={sendErc20Transaction}
          >
            发送代币
          </button>
        </div>
      </div>

      {message && (
        <p className='text-red-500 font-semibold text-center'>{message}</p>
      )}

      <div className='bg-gray-100 flex flex-col items-center p-4 w-full'>
        <input
          type='text'
          className='border p-2 rounded w-full'
          placeholder='合约地址'
          onChange={(e) => setQueryW(e.target.value)}
        />

        {queryW && (
          <div className='mt-4 w-full max-w-md'>
            <p className='text-gray-700'>
              <strong>Address:</strong> {queryW}
            </p>
            <button
              onClick={fetchETHBalance}
              className='bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-700'
            >
              Fetch ETH Balance
            </button>
            {ethBalance && (
              <p className='text-gray-700'>
                <strong>ETH Balance:</strong> {ethBalance || 'Loading...'}
              </p>
            )}

            <button
              onClick={fetchERC20Balance}
              className='bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-700'
            >
              Fetch ERC-20 Balance
            </button>
            {erc20Balance && (
              <p className='text-gray-700 mt-2'>
                <strong>ERC-20 Balance:</strong> {erc20Balance}
              </p>
            )}

            <button
              onClick={fetchTransactions}
              className='bg-purple-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-purple-700'
            >
              Fetch Transactions
            </button>

            {transactions.length > 0 && (
              <div className='mt-4'>
                <h3 className='text-lg font-bold text-gray-700'>
                  Transactions:
                </h3>
                <ul className='space-y-2'>
                  {transactions.map((tx, idx) => (
                    <li key={idx} className='bg-white p-4 rounded shadow'>
                      <p>
                        <strong>Hash:</strong>{' '}
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-500'
                        >
                          {tx.hash}
                        </a>
                      </p>
                      <p>
                        <strong>From:</strong> {tx.from}
                      </p>
                      <p>
                        <strong>To:</strong> {tx.to}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
