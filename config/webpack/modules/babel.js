let babel = {
  'presets': [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    'latest', // 原先会使tree-shaking失效（webpack2）
    'stage-0',
    //'react',
  ],
  'plugins': ['transform-runtime'],
  'env'    : {
    'development': {
      //'presets': ['react-hmre'],
    },
    'production' : {
      'presets': [],
    }
  }
};

if (!!process.env.NODE_TEST) { // 启用测试模式
  babel.plugins.push('istanbul');
}
module.exports = babel;