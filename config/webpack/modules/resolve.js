const base  = require('../base/base'),
      files = require('../base/files'),
      path  = require('path');
module.exports = {
  alias: {
    'lib': path.resolve(files.staticPath, 'index.js'),
    'css': path.resolve(files.cssPath, 'index.' + base.cssType)
  },
  modules: ['node_modules'],
  extensions: ['.js', '.jsx', '.json']
};
