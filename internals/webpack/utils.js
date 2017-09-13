const path = require('path')
const glob = require('glob')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cfg = require('../index')
const happyThreadPool = HappyPack.ThreadPool({ size: 6 }) // 创建5个共享线程池

// 配置文件
exports.dev = cfg.dev
exports.build = cfg.build
exports.path = cfg.path
exports.vendors = cfg.vendors

// 开发环境
const isDev = process.env.NODE_ENV === 'development'
exports.isDev = isDev
exports.isServer = process.env.$Server // 服务器调试模式

// 绝对路径生成器
exports.resolve = (localPath, ...dir) => path.join(process.cwd(), localPath, ...dir)

// 文件打包路径
exports.assetsPath = _path => {
  const assetsSubDirectory = isDev
    ? cfg.build.assetsPath
    : cfg.dev.assetsPath
  return path.posix.join(assetsSubDirectory, _path)
}

// HappyPack生成器
exports.HappyPack = (id, loaders) => new HappyPack({
  id,
  loaders,
  debug: false,
  verbose: false,
  // threads: 4,
  threadPool: happyThreadPool // 自动分配线程池
})

// --------------------------------------------多页配置

// 文件分离
exports.getEntries = (Path, type) => {
  let pathDir = Path,
    entry, // 文件完整路径
    dirName, // 传入的文件夹路径
    baseName, // 文件名
    pathName, // 文件夹路劲
    relativeName, // 键名所需,相对传入文件地址路径
    extName // 文件格式

  const files = glob.sync(`${Path}/${type}`)
  const entries = {}
  for (const i in files) {
    entry = files[i]
    extName = path.extname(entry)
    dirName = path.dirname(entry)
    baseName = path.basename(entry, extName)
    pathName = path.normalize(path.join(dirName, baseName))
    pathDir = path.normalize(pathDir)

    // 逻辑部分
    relativeName = path.relative(pathDir, dirName)
    pathName = path.basename(pathName)
    if (relativeName.includes('\\') || relativeName.includes('\/')) {
      continue
    }
    else {
      if (extName === '.html') {
        entries[relativeName] = entry
      }
      else if (pathName === 'index') {
        entries[relativeName] = [entry]
      }
    }
  }
  return entries
}

// 创建多页
exports.createPages = (plugins, pages) => {
  Object.keys(pages).map(key => {
    // 配置生成的html文件，定义路径等
    const conf = {
      filename: key + '.html',
      template: pages[key],
      inject: true,
    }
    if (!isDev) {
      conf.minify = {
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
    }
    plugins.push(new HtmlWebpackPlugin(conf))
  })
}
