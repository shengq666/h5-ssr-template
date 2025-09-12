import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 如果需要使用App Router的实验性功能
  },
  // 图片域名白名单
  images: {
    domains: ['cdn.yourdomain.com'],
  },
  sassOptions: {
    additionalData: `$var: red;`, // 自动插入文件的开头
    // additionalData: `@import '@/styles/variables.scss';`,
    implementation: 'sass',
  },
  // 异步重定向
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
