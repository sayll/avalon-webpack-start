const base       = require('./base/base.js'),
      files      = require('./base/files'),
      path       = require('path'),
      webpack    = require('webpack'),
      Visualizer = require('webpack-visualizer-plugin');
const vendors = [
  'avalon2'
];

module.exports = {
  output: {
    path: files.dllPath,
    filename: '[name].js',
    library: '[name]',
  },
  resolve: require('./modules/resolve'),
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(files.dllPath, 'vendors.json'),
      name: '[name]',
      context: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new Visualizer({
      filename: './vendors.html'
    })
  ],
};
