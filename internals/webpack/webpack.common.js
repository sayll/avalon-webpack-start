const webpack = require('webpack')
const Merge = require('webpack-merge')

const utils = require('./utils')

module.exports = {
  target: 'web',

  stats: 'errors-only', // 只在发生错误 或是 新的编译时输出

  entry: Merge(
    utils.getEntries(utils.resolve(utils.path.views), `**/*.js`),
    utils.getEntries(utils.resolve(utils.path.views), `**/*.css`), {
      main: [utils.resolve(utils.path.app, `app.js`)]
    }),

  output: {
    filename: utils.isDev ? '[name].js' : `${utils.build.assetsPath}/[name].[chunkhash:8].js`,
    chunkFilename: utils.isDev ?
      '[name].js' : '[name].[chunkhash:8].js',
    path: utils.resolve(utils.path.dist), // emit
    publicPath: utils.isServer ?
      utils.dev.assetsPublicPath : utils.build.assetsPublicPath
  },

  resolve: {
    alias: { // 索引某些依赖
      '~': utils.resolve(utils.path.app)
    },
    extensions: ['.js', '.jsx']
    // modules: ['node_modules']
  },

  plugins: [
    new webpack.ProvidePlugin({ //  其他模块可以公用
      'avalon': 'avalon2'
    }),
    new webpack.DefinePlugin({ // 配置环境
      'NICE_FEATURE': JSON.stringify(utils.isDev), // 「启用/禁用」「生产/开发」构建中的功能。
      'EXPERIMENTAL_FEATURE': JSON.stringify(utils.isDev), // 实验性功能
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(), // 排序输出
    new webpack.optimize.ModuleConcatenationPlugin(), // 提升作用域
    // HappyPack
    utils.HappyPack('Babel', ['cache-loader', 'babel-loader'])
  ],

  module: {
    noParse: [/jquery$/], // 不解析某些模块
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=Babel'],
        include: [utils.resolve(utils.path.app)],
        exclude: file => !!file.match(/node_modules/)
      },
      {
        test: /\.(css|pcss)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: [utils.resolve(utils.path.app)],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: utils.assetsPath('images/[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [utils.resolve(utils.path.app)],
        use: {
          loader: 'file-loader',
          options: {
            name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
          }
        }
      }
    ]
  }
}

// 添加Eslint
if (utils.isDev ? utils.dev.eslint : utils.build.eslint) {
  module.exports.plugins.unshift(utils.HappyPack('ESLint', ['cache-loader', 'eslint-loader']))
  module.exports.module.rules.unshift({
    test: /\.(js|jsx)$/,
    use: ['happypack/loader?id=ESLint'],
    include: [utils.resolve(utils.path.app)],
    exclude: file => !!file.match(/node_modules/),
    enforce: 'pre'
  })
}

// 添加多页
const pages = utils.getEntries(utils.resolve(utils.path.views), '**/*.html')

utils.createPages(module.exports.plugins, pages)
