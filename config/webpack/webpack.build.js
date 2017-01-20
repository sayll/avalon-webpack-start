const webpack        = require('webpack'),
      merge          = require('webpack-merge'),
      WebpackMd5Hash = require('webpack-md5-hash'),
      Visualizer     = require('webpack-visualizer-plugin');
let config           = require('./webpack.config.js')({dev: false});

/** --------------------
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
    new webpack.optimize.UglifyJsPlugin({
      exclude : /\.min\.js$/,
      mangle  : true,
      compress: {
        warnings    : false,
        screw_ie8   : true,
        conditionals: true,
        unused      : true,
        comparisons : true,
        sequences   : true,
        dead_code   : true,
        evaluate    : true,
        if_return   : true,
        join_vars   : true,
      },
      output  : {
        comments: false
      },
    })
  ]
});