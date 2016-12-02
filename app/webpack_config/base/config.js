var pkg       = require('../../package.json'),
		path      = require('path'),
		ROOT_PATH = path.resolve(__dirname, '../../../'),
		APP_PATH  = path.resolve(ROOT_PATH, pkg.config.app.index);
var cfg = {
	type      : pkg.config.type,
	pkg       : {
		path             : path,
		glob             : require('glob'),
		util             : require('util'),
		merge            : require('webpack-merge'),
		webpack          : require('webpack'),
		HtmlWebpackPlugin: require('html-webpack-plugin'),
		ExtractTextPlugin: require('extract-text-webpack-plugin')
	},
	loaders   : require('./loaders'),
	mobile    : pkg.config.mobile, /*是否开启移动端编写：添加了px2rem*/
	react     : pkg.config.react, /*是否开启react*/
	version   : pkg.version, /*版本号*/
	buildDir  : pkg.config.buildDir, /*输出文件夹名*/
	sourcePath: pkg.config.sourcePath, /*href引用的地址，可cdn*/
	devHost   : pkg.config.devHost, /*服务器*/
	devPort   : pkg.config.devPort,
	_js       : pkg.config.app.js, /*文件名*/
	_css      : pkg.config.app.css, /*文件名*/
	_img      : pkg.config.app.img, /*文件名*/
	_font     : pkg.config.app.font, /*文件夹名*/
	root      : ROOT_PATH, /*根目录*/
	app       : APP_PATH, /*开发文件地址*/
	build     : path.resolve(ROOT_PATH, pkg.config.buildDir), /*输出文件地址and名*/
	html      : path.resolve(APP_PATH, pkg.config.app.html), /*视图存放地址*/
	static    : path.resolve(APP_PATH, pkg.config.app.static), /*静态文件地址*/
	component : path.resolve(APP_PATH, pkg.config.app.component), /*组件地址*/
	js        : path.resolve(APP_PATH, pkg.config.app.js), /*开发JS地址*/
	view      : path.resolve(APP_PATH, pkg.config.app.view), /*开发JS地址*/
	css       : path.resolve(APP_PATH, pkg.config.app.css), /*开发CSS地址*/
	img       : path.resolve(APP_PATH, pkg.config.app.img), /*开发img地址*/
	font      : path.resolve(APP_PATH, pkg.config.app.font)/*开发font地址*/
}
module.exports = cfg;