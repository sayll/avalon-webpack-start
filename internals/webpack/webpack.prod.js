const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const utils = require('./utils')
const common = require('./webpack.common')

// 导出配置
module.exports = webpackMerge(common, {
  entry: Object.assign({}, utils.vendors.length && {
    vendors: utils.vendors
  }),
  devtool: utils.isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  plugins: [
    // 清除构建前文件
    new CleanPlugin([utils.path.dist], {
      root: utils.resolve('./'),
      exclude: [utils.isDev && 'vendors'], // 测试模式保留vendors文件
      verbose: true,
      dry: false
    }),
    // 复制静态地址文件
    new CopyPlugin([
      {
        from: utils.resolve(utils.path.static),
        to: utils.path.static,
        ignore: ['.*']
      }
    ]),
    new ExtractTextPlugin({
      filename: utils.assetsPath('../[name].[contenthash].css')
    }),
    new webpack.HashedModuleIdsPlugin({ // 修复文件修改后的模块索引id使hash缓存失效
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10, // 限制 chunk 的最大数量 -- 必须大于或等于 1
      minChunkSize: 1000
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 抽离公共项 必须在runtime前引入
      name: 'vendors',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 抽离运行时代码
      name: 'runtime',// 其他模块重复使用
      minChunks: 2
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        include: [utils.resolve(utils.path.app)],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },

  performance: { // 性能警告
    maxAssetSize: 250000, // 单资源最大
    hints: 'warning'
  }
})

// 压缩代码
!utils.isDev && module.exports.plugins.push(new UglifyJSPlugin({
  parallel: {
    cache: true,
    workers: 2 // for e.g
  }
}))

// Gzip
if (utils.build.productionGzip) {
  const CompressionPlugin = require('compression-webpack-plugin')
  module.exports.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        utils.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 资源分析仪
if (process.env.$Analyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  module.exports.plugins.push(new BundleAnalyzerPlugin())
}
