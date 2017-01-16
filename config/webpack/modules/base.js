let packages = require('../../../package.json');

module.exports = {
  devHost : '0.0.0.0',
  devPort : '1000',
  viewType: 'html',
  cdnPath : '/', // 资源指向位置,可寄放CDN
  version : packages.version
};