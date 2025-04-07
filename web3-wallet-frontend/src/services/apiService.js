// src/services/apiService.js
import axiosInstance from '../utils/axiosInstance';

// 创建新钱包
export const createWallet = async () => {
  try {
    const response = await axiosInstance.post('/api/wallet/create-v2');
    return response;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

// 从本地恢复钱包
export const restoreWallet = async () => {
  try {
    const response = await axiosInstance.post('/api/wallet/restore');
    return response;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

// 从助记词恢复钱包
export const recoverWallet = async (mnemonic) => {
  try {
    const response = await axiosInstance.post('/api/wallet/recover', mnemonic);
    return response;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const sendETH = async (data) => {
  try {
    const response = await axiosInstance.post('/api/eth/send', data);
    return response;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const sendERC20 = async (data) => {
  try {
    const response = await axiosInstance.post('/api/erc20/send', data);
    return response;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const getEthBalance = async (address) => {
  try {
    const response = await axiosInstance.get(`/api/eth/balance/${address}`);
    return response;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
 
export const getERC20Balance = async (data) => {
  try {
    const response = await axiosInstance.post('/api/erc20/balance', data);
    return response;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};