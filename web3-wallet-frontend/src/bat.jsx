import React, { useState } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
  const [address, setAddress] = useState('');
  const [ethBalance, setEthBalance] = useState(null);
  const [erc20Balance, setErc20Balance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const erc20ContractAddress = '<ERC20_CONTRACT_ADDRESS>'; // Replace with ERC20 contract address
  const erc20ABI = [
    // ERC-20 ABI for balanceOf and decimals
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
  ];

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed.');

      // Request account access
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAddress(account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);

      setEthBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const fetchERC20Balance = async () => {
    try {
      if (!address) throw new Error('Connect wallet first.');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20Contract = new ethers.Contract(
        erc20ContractAddress,
        erc20ABI,
        provider
      );

      const balance = await erc20Contract.balanceOf(address);
      const decimals = await erc20Contract.decimals();
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);

      setErc20Balance(formattedBalance);
    } catch (error) {
      console.error('Error fetching ERC-20 balance:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      if (!address) throw new Error('Connect wallet first.');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const history = await provider.getHistory(address);

      setTransactions(history);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-4'>
      <h1 className='text-3xl font-bold text-blue-600 mb-6'>Web3 Wallet</h1>
      <button
        onClick={handleConnectWallet}
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
      >
        Connect Wallet
      </button>

      {address && (
        <div className='mt-4 w-full max-w-md'>
          <p className='text-gray-700'>
            <strong>Address:</strong> {address}
          </p>
          <p className='text-gray-700'>
            <strong>ETH Balance:</strong> {ethBalance || 'Loading...'}
          </p>

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
              <h3 className='text-lg font-bold text-gray-700'>Transactions:</h3>
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
                    <p>
                      <strong>Value:</strong>{' '}
                      {ethers.utils.formatEther(tx.value)} ETH
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wallet;
