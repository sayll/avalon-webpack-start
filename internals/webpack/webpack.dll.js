const webpack = require('webpack')

const utils = require('./utils')

// 没有依赖，跳出执行
!utils.vendors.length && process.exit(0)

module.exports = {
  devtool: 'eval',
  entry: {
    vendors: utils.vendors
  },
  output: {
    path: utils.resolve(utils.path.dll),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: utils.resolve(utils.path.dll, 'vendors.json'),
      name: '[name]',
      context: '/'
    }),
    new webpack.DefinePlugin({
      'NICE_FEATURE': JSON.stringify(!utils.isDev),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin() // 提升作用域
  ],
  performance: {
    hints: false
  }
}
