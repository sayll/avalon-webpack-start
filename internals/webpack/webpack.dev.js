const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const utils = require('./utils')
const common = require('./webpack.common')

Object.keys(common.entry).forEach(name => {
  common.entry[name].unshift(
    'webpack-hot-middleware/client?noInfo=true&reload=true'
    //'eventsource-polyfill' // 热替换兼容低版IE
  )
})

module.exports = webpackMerge(common, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css|pcss$/,
        include: [utils.resolve(utils.path.app)],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
})

utils.vendors.length && (
  module.exports.plugins.push(
    new IncludeAssetsPlugin({
      assets: [`${utils.path.dll.replace(`${utils.path.dist}/`, '')}/vendors.js`],
      append: false,
      hash: true
    }),
    new webpack.DllReferencePlugin({
      context: '/',
      manifest: require(utils.resolve(utils.path.dll, `vendors.json`))
    })
  )
)
