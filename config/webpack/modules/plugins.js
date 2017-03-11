const base      = require('../base/base'),
      files     = require('../base/files'),
      HappyPack = require('happypack'),
      webpack   = require('webpack');
function cHappypack(id, loaders) {
  return new HappyPack({
    id: id,
    debug: false,
    verbose: false,
    cache: true,
    threads: 4,
    cacheContext: {
      env: process.env.NODE_ENV
    },
    loaders: loaders
  })
}

const vendorsJson = files.dllPath + '/vendors.json';

module.exports = [
  new webpack.NoEmitOnErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),

  new webpack.DllReferencePlugin({
    context: '/',
    manifest: require(vendorsJson)
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true,
    options: {
      context: files.appPath,
      postcss: base.cssType === 'pcss' ? [
          /* function vr(css) { // postCss插件DEMO
            // 设置 line-height.
            var lineHeight = 32;
            // 使用 PostCSS 的 `eachDecl()` 遍历每个 CSS 声明，并传入声明字符串 (`decl`)。
            css.eachDecl(function (decl) {
              // 如果声明值匹配到了 `vr` 单位。
              if (decl.value.match(/vr/)) {
                decl.value = lineHeight * parseFloat(decl.value) + 'px';
              }
            });
          }*/
          require("postcss-cssnext")(({
            features: {
              customProperties: false
            }
          })),
          /**
           * 以下部分为了针对mobile做处理
           * 牺牲了cssMaps,位置不要随意调整
           * */
          //require("postcss-import")({root: files.cssPath}),
          //require("postcss-extend")(),
          //require("postcss-url")(),
          /*require("postcss-px2rem")({
            remUnit     : 75,
            remPrecision: 8,
            baseDpr     : 2 // 默认2倍视角
          })*/
        ] : [require('autoprefixer')({
          browsers: ['> 1%', 'last 5 versions', 'Firefox ESR'],
          cascade: false
        })]
    }
  }),

  cHappypack('HTML', ['html-loader']),

  cHappypack('JSX', [{
    loader: 'babel-loader',
    query: require('./babel')
  }]),
];