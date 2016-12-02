var cfg = require('./base/config');
var webpack        = cfg.pkg.webpack,
		merge          = cfg.pkg.merge,
		fs             = require('fs'),
		WebpackMd5Hash = require('webpack-md5-hash'),
		config         = require('./webpack.base.config');
/**
 * 初始化目录，删除旧目录
 * */
var deleteFolder = module.exports.deleteFolder = function (path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteFolder(curPath);
			}
			else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
deleteFolder(cfg.build);
/**
 * end
 * */
module.exports = merge(config({debug: false, mobile: cfg.mobile,react:cfg.react}), {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ //压缩代码
			compress : {
				warnings: false
			},
			minimize : true,
			sourceMap: false,
			except   : ['$', 'exports', 'require'] //排除关键字
		}),
		new WebpackMd5Hash(), // 修改单文件不影响其他hash
	
	]
});