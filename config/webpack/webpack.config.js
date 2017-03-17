const base              = require('./base/base.js'),
      files             = require('./base/files'),
      path              = require('path'),
      glob              = require('glob'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (option = { dev: process.env.NODE_ENV === 'development' }) => ((Glob, objConcat, createHtml) => {

  /**
   * Config
   * */
  let Config = {
    entry: objConcat(Glob.fileCss, objConcat(Glob.fileJs, require('./modules/entry'))),
    resolve: require('./modules/resolve'),
    output: {
      path: path.join(files.root, files.buildName),
      publicPath: base.cdnPath, //资源文件引用路径
      filename: Glob.jsBundle,
      crossOriginLoading: false, // 是否允许跨域加载[anonymous,use-credentials,false]
      chunkFilename: 'async/[name].js',
      sourceMapFilename: '[file].map'
    },
    module: require('./modules/loader')(option.dev),
    plugins: require('./modules/plugins')
  };

  Config.plugins.push(new ExtractTextPlugin(Glob.cssBundle));

  /**
   * 创建所有的视图模块
   * */
  createHtml(Config, Glob.fileHtml, files.htmlPath, base.viewType, option.dev);
  return Config;
})(
  /**
   * 处理所需文件的文件目录，输出对应文件的对象
   * */
  ((debug) => {
    /**
     * 此变量用于匹配储存HTML对应模块
     * 非模块内的资源文件不会被webpack引入
     * */
    let VIEWS = [];

    function getEntry(option, VIEWS) {
      let pathDir = option.pathDir,
          files   = glob.sync(option.globPath);

      let entries = {},
          entry, // 文件完整路径
          dirName, // 传入的文件夹路径
          baseName, // 文件名
          pathName, // 文件夹路劲
          relativeName, // 键名所需,相对传入文件地址路径
          extName; // 文件格式

      for (let i = 0; i < files.length; i++) {
        entry = files[i];
        extName = path.extname(entry);
        dirName = path.dirname(entry);
        baseName = path.basename(entry, extName);
        pathName = path.normalize(path.join(dirName, baseName));
        pathDir = path.normalize(pathDir);
        if (extName === `.${base.viewType}`) { // 是否是view
          pathName = pathName.substring(pathDir.length);
          VIEWS.push(pathName); // 把VIEW相关的模块引入webpack
        }
        else {
          relativeName = path.relative(pathDir, dirName);
          pathName = path.basename(pathName);
          if (VIEWS.indexOf(relativeName) === -1 || relativeName.indexOf(pathName) === -1) {
            // 不属于HTML相关JS直接跳出循环
            continue;
          }
          else {
            pathName = relativeName;
          }
        }
        entries[pathName] = [entry];
      }
      return entries;
    }

    let fileHtml  = Object.keys(getEntry({
          globPath: files.htmlPath + '/**/*',
          pathDir: files.htmlPath + '/'
        }, VIEWS)),
        fileJs    = getEntry({
          globPath: files.viewPath + '/**/*.?(js|jsx)',
          pathDir: files.viewPath + '/'
        }, VIEWS),
        fileCss   = getEntry({
          globPath: files.viewPath + '/**/*.?(css|pcss|sass|scss|less)',
          pathDir: files.viewPath + '/'
        }, VIEWS),
        jsBundle  = debug ? `${files.jsName}/[name].js` : `${files.jsName}/[name].[chunkhash:8].js`,
        cssBundle = debug ? `${files.cssName}/[name].css` : `${files.cssName}/[name].[contenthash:8].css`;
    return {
      'fileHtml': fileHtml,
      'fileJs': fileJs,
      'fileCss': fileCss,
      'jsBundle': jsBundle,
      'cssBundle': cssBundle
    }
  })(option.dev),

  /**
   * 处理文件页面资源对应关系
   * */
  (obj1, obj2) => {
    Object.keys(obj1).forEach(function (o) {
      if (!!obj2[o] && obj2[o] !== obj1[o]) {
        obj2[o] = obj2[o].concat(obj1[o]);
      }
      else {
        obj2[o] = obj1[o]
      }
    });
    return obj2;
  },

  /**
   * config:webpack的config
   * htmlFiles: 某目录下的所有HTML对象
   * htmlPath：HTML视图地址
   * viewType：HTML模版引擎格式（如html,pug,jade）
   * dev: 是否开发模式，对应引入热替换模块
   * */
  (config, htmlFiles, htmlPath, viewType, debug) => {

    if (debug) {
      Object.keys(config.entry).forEach((e) => {
        config.entry[e].unshift(
          'webpack-hot-middleware/client?reload=true'
          //'eventsource-polyfill' // 热替换兼容IE
        )
      });
    }

    // 遍历创建所有HTML
    htmlFiles.forEach(function (pathname) {
      let conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: path.resolve(htmlPath, pathname + '.' + viewType), //html模板路径
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      };
      if (pathname in config.entry) { // 同HTML文件名的JS分离出来
        conf.inject = 'body';
        conf.chunks = ['Common', 'Main', pathname];
      }
      else {
        conf.inject = 'body';
        conf.chunks = ['Common', 'Main'];
      }
      conf.chunksSortMode = function (a, b) { // 按照配置排序
        let index = {}, i = 1,
            len           = conf.chunks.length;
        for (; i <= len; i++) {
          index[conf.chunks[len - i]] = i;
        }
        let aI = index[a.origins[0].name],
            bI = index[b.origins[0].name];
        return aI && bI ? bI - aI : -1;
      };
      config.plugins.push(new HtmlWebpackPlugin(conf));
    });
  });

