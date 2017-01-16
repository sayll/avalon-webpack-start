module.exports = {
  'presets': [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    //'latest', 目前会使tree-shaking失效（webpack2）
    'stage-0',
    'react',
  ],
  'env'    : {
    'development': {
      'presets': ['react-hmre'],
    },
    'production' : {
      'presets': [],
    }
  }
};