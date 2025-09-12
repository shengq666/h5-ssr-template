// lib/axios.ts
import axios from 'axios';

// 从环境变量读取后端API基地址，区分开发和生产环境
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：可自动添加Token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token'); // 或在store中获取
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器：统一处理错误
apiClient.interceptors.response.use(
  response => response.data, // 直接返回data，简化使用
  error => {
    if (error.response?.status === 401) {
      // Token过期，跳转登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
