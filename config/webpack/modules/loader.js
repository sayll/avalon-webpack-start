const files             = require('./files'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (dev) => {
  return {
    noParse: /jquery|avalon/, // 忽略某些查找的库，提高构建速度
    rules  : [
      {
        test   : /\.(js|jsx)$/,
        exclude: [],
        include: [files.viewPath, files.staticPath, files.jsPath, files.htmlPath],
        use    : [{
          loader: 'babel-loader',
          query : require('./babel')
        }]
      },
      { // 处理HTML关于src链接问题
        test   : /\.(html)$/,
        include: [files.htmlPath, files.viewPath],
        use    : ['html-loader']
      },
      {
        test   : /\.json$/,
        include: [files.viewPath, files.staticPath],
        use    : ['json-loader']
      },
      {
        test   : /\.(pcss|css)$/,
        exclude: [files.cssPath],
        use    : [
          'style-loader',
          {
            loader: 'css-loader',
            query : {
              modules          : false,
              outputStyle      : 'expanded',
              sourceMap        : dev,
              sourceMapContents: dev
            }
          },
          'postcss-loader'
        ]
      },
      { // 独立的文件resetCSS
        test   : /\.(css|pcss)$/,
        include: [files.cssPath],
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader        : [
            {
              loader: 'css-loader',
              query : {
                modules          : false,
                outputStyle      : 'expanded',
                sourceMap        : dev,
                sourceMapContents: dev
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test   : /\.(jpg|jpeg|png|gif|svg)$/,
        include: [files.imgPath, files.viewPath],
        use    : [
          {
            loader: 'url-loader',
            query : {
              limit: 2000,
              name : 'assets/[name]-[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query : {
              progressive      : true,
              optimizationLevel: 7,
              interlaced       : false,
              pngquant         : {
                quality: "65-90",
                speed  : 4
              }
            }
          }]
      },
      {
        test   : /\.(svg|ico|woff|eot|ttf)$/,
        include: [files.fontPath, files.viewPath],
        use    : [
          {
            loader: 'url-loader',
            query : {
              limit: 1,
              name : 'assets/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};