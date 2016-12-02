var config = require("./webpack.base.config");
var cfg = require('./base/config');
var webpack          = cfg.pkg.webpack,
		WebpackDevServer = require('webpack-dev-server');

config = cfg.pkg.merge(config({debug: true, mobile: cfg.mobile, react: cfg.react}), {
	
	plugins  : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),//允许错误不打断程序
	],
	devtool  : "inline-source-map",
	devServer: {
		contentBase       : cfg.buildDir,
		historyApiFallback: true, // gzip
		hot               : true,
		inline            : true,
		progress          : true,
		stats             : {
			cached : false,
			exclude: [/node_modules[\\\/]/, /\.html/],
			colors : true
		},
		proxy             : {
			// 用于转发api数据
			'/api/*': {
				target: 'http://localhost:1000',// https://other-server.example.com
				secure: false,
				bypass: function (req, res, proxyOptions) {
				}
			}
		}
	}
});

var port = cfg.devPort,
		host = cfg.devHost;
/**
 * 给所有引入文件启动热替换
 * */
Object.keys(config.entry).forEach(function (e) {
	config.entry[e].unshift("webpack/hot/dev-server", 'webpack-dev-server/client?http://' + host + ':' + port)
});

var server = new WebpackDevServer(
		webpack(config),
		config.devServer
);
server.listen(port, host, function (err) {
});