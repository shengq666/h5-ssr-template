module.exports = {
  plugins: {
    // 其他 PostCSS 插件，例如 tailwindcss 和 autoprefixer，如果已经配置请保留
    // tailwindcss: {},
    // autoprefixer: {},
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px', // 要转换的单位，默认是 'px'
      viewportWidth: 375, // 设计稿的视口宽度，通常以 iPhone 6/7/8 的 375px 为准，也可能是 750px
      unitPrecision: 5, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定哪些属性需要转换，['*'] 表示所有属性
      viewportUnit: 'vw', // 转换后的视口单位
      fontViewportUnit: 'vw', // 字体转换后的视口单位
      selectorBlackList: [], // 指定不转换的选择器，可以是字符串或正则表达式
      minPixelValue: 1, // 最小的转换像素值，小于等于此值的 px 不转换
      mediaQuery: false, // 是否允许在媒体查询中转换 px
      replace: true, // 是否直接替换值而不添加备用属性
      exclude: [/node_modules/], // 排除特定文件或目录，例如 node_modules
      include: undefined, // 明确需要转换的文件或目录
      landscape: false, // 是否处理横屏情况
      landscapeUnit: 'vw', // 横屏时使用的单位
      // landscapeWidth: 568 // 横屏时的视口宽度
    },
  },
}