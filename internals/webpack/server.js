const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = require('webpack-dashboard')

// 配置文件
const config = require('./webpack.dev.js')
const utils = require('./utils')

const app = express()
const compiler = webpack(config)
// 美化控制台
compiler.apply(new DashboardPlugin(new dashboard({
  port: utils.dev.port,
  minimal: true,
  title: 'Sayll',
  color: '#2ba1cb'
}).setData))

// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
  stats: { colors: true },
  noInfo: false,
  hot: true
}))

app.use(webpackHotMiddleware(compiler, {
  log: (msg) => {
    //console.log(msg)
  }
}))

// 404 pages
app.use(require('connect-history-api-fallback')())
// serve pure static assets
app.use('/static', express.static(utils.resolve(utils.path.static)))
app.use('/', express.static(utils.resolve(utils.path.dist)))

// Serve the files on port 3000.
app.listen(utils.dev.port, function () {
  console.log(`App listening on port ${utils.dev.port}!\n`)
})
