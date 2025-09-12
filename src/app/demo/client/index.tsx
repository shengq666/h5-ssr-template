'use client'
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { getQuery } from '@/utils'

// 创建一个资源缓存
const cache = new Map()

// 模拟异步数据获取函数
function fetchData() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('KFCVme50')
    }, 3000)
  })
}

// 创建一个支持Suspense的资源读取函数
function fetchDataResource() {
  const key = 'demoData'

  if (cache.has(key)) {
    const cached = cache.get(key)
    switch (cached.status) {
      case 'pending':
        throw cached.promise
      case 'success':
        return cached.data
      case 'error':
        throw cached.error
    }
  }

  const promise = fetchData().then(
    (data) => {
      cache.set(key, { status: 'success', data })
      return data
    },
    (error) => {
      cache.set(key, { status: 'error', error })
      throw error
    }
  )

  cache.set(key, { status: 'pending', promise })
  throw promise
}

export default function Index() {
  const data = fetchDataResource()
  const router = useRouter()

  const query = getQuery()
  useEffect(() => {
    console.log('query', query)
  }, [query])

  return (
    <div className={styles.index}>
      我的姓名是：{data}
      <Button
        color="primary"
        fill="solid"
        onClick={() => {
          router.push('/hello?name=张三')
        }}
      >
        Solid
      </Button>
    </div>
  )
}
