// src/utils/axiosInstance.js
import axios from 'axios';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9898', // 替换为你的 API 地址
  timeout: 10000, // 请求超时 10 秒
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求前添加一些处理逻辑，比如添加 Token
    // const token = localStorage.getItem('token'); // 假设 Token 存储在 localStorage 中
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 统一处理响应
    return response.data; // 直接返回数据，减少层级
  },
  (error) => {
    // 错误处理逻辑
    if (error.response) {
      console.error('Error Response:', error.response.data.message || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
