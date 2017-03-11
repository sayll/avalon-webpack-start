const webpack        = require('webpack'),
      merge          = require('webpack-merge'),
      WebpackMd5Hash = require('webpack-md5-hash'),
      Visualizer     = require('webpack-visualizer-plugin');
let config = require('./webpack.config.js')({ dev: false });

/**
 * 打包资源，性能分析
 * */
if (process.env.NODE_TEST === 'production') {
  config.plugins.push(
    new Visualizer({
      filename: './statistics.html'
    })
  )
}

module.exports = merge(config, {
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin()
  ]
});