import type { NextConfig } from 'next';

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
        source: '/',
        destination: '/demo',
        permanent: true, // true 或 false - 如果为 true 将使用 308 状态码，指示客户端/搜索引擎永久缓存此重定向；如果为 false 则使用 307 临时状态码且不会被缓存
      },
    ];
  },
  // 开发环境代理配置
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '开发环境代理配置',
        process.env.NODE_ENV,
        process.env.NEXT_PUBLIC_API_BASE_URL
      );
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
