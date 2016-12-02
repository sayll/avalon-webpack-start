module.exports = function (config) {
	config.set({
		basePath         : '',
		// 使用的测试框架
		frameworks       : ['mocha'],
		// 需要测试的文件地址
		files            : ['test/*.js'],
		// 排除的文件地址
		exclude          : [],
		// 配置预处理器,ES6代码需要预处理
		preprocessors    : {
			'test/*.js': ['webpack']
		},
		// 需要生成的代码报告
		reporters        : ['progress', 'coverage'],
		// 端口号
		port             : 9876,
		// 输出带颜色
		colors           : true,
		// 打印的消息 possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel         : config.LOG_INFO,
		// 是否改动代码自动刷新页面
		autoWatch        : false,
		// 测试完成，是否关闭浏览器
		singleRun        : true,
		// 需要测试的浏览器
		browsers         : ['PhantomJS'],
		// 超时退出
		captureTimeout   : 60000,
		webpack          : {
			module: {
				loaders: [{
					test   : /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader : 'babel-loader',
					query  : {
						presets: ['es2015'],
						plugins: ['istanbul']
					}
				}]
			}
		},
		webpackMiddleware: {
			noInfo: true
		},
		// 覆盖率报告要如何生成
		coverageReporter : {
			dir      : 'coverage',
			reporters: [{
				type  : 'json',
				subdir: '.',
				file  : 'coverage.json',
			}, {
				type  : 'lcov',
				subdir: '.'
			}, {
				type: 'text-summary'
			}]
		}
	})
}