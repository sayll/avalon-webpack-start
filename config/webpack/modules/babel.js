let babel = {
  cacheDirectory: true,
  'presets': [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    'latest',
    'stage-0',
    //'react',
  ],
  'plugins': ['transform-runtime'],
  'env': {
    'development': {
      //'presets': ['react-hmre'],
    },
    'production': {
      'presets': [],
    }
  }
};

if (!!process.env.NODE_TEST) { // 启用测试模式
  babel.plugins.push('istanbul');
}
module.exports = babel;