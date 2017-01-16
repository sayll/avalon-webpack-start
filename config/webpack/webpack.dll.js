const base       = require('./modules/base.js'),
      files      = require('./modules/files'),
      path       = require('path'),
      webpack    = require('webpack'),
      Visualizer = require('webpack-visualizer-plugin');
const vendors    = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-saga',
  'react-weui'
];

module.exports = {
  output : {
    path    : files.dllPath,
    filename: '[name].js',
    library : '[name]',
  },
  entry  : {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path   : path.join(files.dllPath, 'vendors.json'),
      name   : '[name]',
      context: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({// webpack压缩，控制台输出删减
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
    }),
    new Visualizer({
      filename: './vendors.html'
    })
  ],
};
