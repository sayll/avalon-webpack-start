const path = require('path')

const filesPath = {
  app: 'app', // 资源根目录
  dist: 'dist', // 打包文件
  dll: 'dist/vendors', // dll打包文件
  utils: 'app/utils', // 资源目录
  static: 'static', // 静态文件目录
  assets: 'app/assets', // 资源目录
  views: 'app/views', // 视图
  components: 'app/components' // 组件目录
}

module.exports = {
  path: filesPath,
  vendors: [
    'avalon2'
  ],
  dev: {
    eslint: false,
    port: 3001,
    assetsPath: 'assets',
    assetsPublicPath: '/',
    sourceMap: true
  },
  build: {
    eslint: false,
    // 服务根目录
    assetsRoot: path.resolve(process.cwd(), filesPath.dist),
    // 指向静态资源
    assetsPath: 'assets',
    assetsPublicPath: './',
    // 是否生成用于生产构建的源映射
    sourceMap: false,
    // Gzip 默认关闭如需开启请安装下列依赖
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
