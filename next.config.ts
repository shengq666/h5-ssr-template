import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 如果需要使用App Router的实验性功能
    optimizePackageImports: ['antd-mobile', 'axios', 'lodash'],
    // // 开启后，Next.js 会自动将所有的 React 组件转换为 Server Components
    // serverComponentsExternalPackages: ['antd-mobile'],
  },
  // 压缩配置
  compress: true, // 默认情况下，当使用 next start 或自定义服务器时，Next.js 会使用 gzip 压缩渲染内容和静态文件。这是针对未配置压缩的应用程序的优化。如果您的应用程序已通过自定义服务器配置了压缩，Next.js 将不会重复添加压缩功能。
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      // 只在生产环境的客户端构建中应用这些优化
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          // minSize: 20000, // 生成 chunk 的最小体积（20KB）
          maxSize: 1024 * 1024 * 5, // 生成 chunk 的最大体积（0表示不限制）
          minChunks: 1, // 模块被引用的最小次数
          // maxAsyncRequests: 30, // 按需加载时的最大并行请求数
          // maxInitialRequests: 30, // 入口点的最大并行请求数
          cacheGroups: {
            // 第三方库分包
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // 公共代码分包
            common: {
              name: 'common',
              minChunks: 2, // 至少被引用2次
              chunks: 'all',
              priority: 5,
            },
            // 框架代码分包
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 20,
            },
          },
        },
        runtimeChunk: 'single',
      }
    }

    return config
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
    ]
  },
  // 开发环境代理配置
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '开发环境代理配置',
        process.env.NODE_ENV,
        process.env.NEXT_PUBLIC_API_BASE_URL
      )
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
        },
      ]
    }
    return []
  },
}

export default nextConfig
