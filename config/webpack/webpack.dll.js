const base       = require('./base/base.js'),
      files      = require('./base/files'),
      path       = require('path'),
      webpack    = require('webpack'),
      Visualizer = require('webpack-visualizer-plugin');
const vendors    = [
  'avalon2',
  'jquery'
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new Visualizer({
      filename: './vendors.html'
    })
  ],
};
