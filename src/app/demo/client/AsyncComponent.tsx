'use client';

import React from 'react';
import styles from './index.module.scss';

// 创建一个资源缓存
const cache = new Map();

// 模拟异步数据获取函数
function fetchData() {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('shengq');
    }, 3000);
  });
}

// 创建一个支持Suspense的资源读取函数
function fetchDataResource() {
  const key = 'demoData';

  if (cache.has(key)) {
    const cached = cache.get(key);
    switch (cached.status) {
      case 'pending':
        throw cached.promise;
      case 'success':
        return cached.data;
      case 'error':
        throw cached.error;
    }
  }

  const promise = fetchData().then(
    data => {
      cache.set(key, { status: 'success', data });
      return data;
    },
    error => {
      cache.set(key, { status: 'error', error });
      throw error;
    }
  );

  cache.set(key, { status: 'pending', promise });
  throw promise;
}

export default function AsyncComponent() {
  const data = fetchDataResource();

  return <div className={styles.index}>我的姓名是：{data}</div>;
}
