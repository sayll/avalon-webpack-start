module.exports = {
  'compact': true,
  'presets': [
    'es2015',
    'latest',
    'stage-0',
    'react',
  ],
  'plugins': [
    //['import', [{libraryName: 'antd-mobile', style: 'css'/*true将启用less||sass*/}]]
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