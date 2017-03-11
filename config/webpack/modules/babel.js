const babel = {

  cacheDirectory: true,

  'presets': [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    'stage-2',
    // Stage 2 is "draft", 4 is finished, 0 is strawMan.
  ],

  'plugins': ['transform-runtime',],

  'env': {
    'development': {
      'presets': [],
      'plugins': [],
    },
    'production': {
      'presets': [],
      'plugins': [],
    }
  }

};

if (process.env.NODE_TEST) { // 启用测试模式
  babel.plugins.push('istanbul');
}
module.exports = babel;