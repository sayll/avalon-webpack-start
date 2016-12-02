var cfg = require('./base/config');
var path              = cfg.pkg.path,
		glob              = cfg.pkg.glob,
		webpack           = cfg.pkg.webpack,
		util              = cfg.pkg.util,
		ExtractTextPlugin = cfg.pkg.ExtractTextPlugin,
		HtmlWebpackPlugin = cfg.pkg.HtmlWebpackPlugin,
		autoprefixer      = require('autoprefixer');


module.exports = function (option) {
	var DEBUG = !!option.debug;
	/**
	 * 控制输出文件名
	 * 发布环境给予hash,维持最新文件
	 * */
	var jsBundle  = DEBUG ? path.join(cfg._js, util.format('[name].js')) : path.join(cfg._js, util.format('[name].%s.[chunkhash:8].js', cfg.version)),
			cssBundle = DEBUG ? path.join(cfg._css, util.format('[name].css')) : path.join(cfg._css, util.format('[name].%s.[contenthash:8].css', cfg.version));
	
	/**
	 * 返回文件名-路劲的对象
	 * */
	var file_js   = getEntry({
		globPath: cfg.view + '/**/*.?(js|jsx)',
		pathDir : cfg.view + '/',
		on_off  : true
	}),
			file_css  = getEntry({
				globPath: cfg.view + '/**/*.?(css|scss)',
				pathDir : cfg.view + '/',
				on_off  : true
			}),
			file_html = Object.keys(getEntry({
				globPath: cfg.html + '/**/*',
				pathDir : cfg.html + '/',
				on_off  : false
			}));
	var config = {
		entry  : objConcat(file_css, objConcat(file_js, {
			'Common': ['lib'],
			'Main'  : [path.resolve(cfg.js, 'main.js')]
		})),
		resolve: {
			extensions: ['', '.js', '.jsx', '.json', 'css', 'scss'],
			alias     : {
				'lib': path.resolve(cfg.static, 'lib/index.js'),
			}
		},
		output : {
			path         : path.join(cfg.root, cfg.buildDir), // 文件输出地址
			publicPath   : cfg.sourcePath, //资源文件引用路径
			filename     : jsBundle,
			chunkFilename: cfg.js + '/asyn/[name].js',
		},
		module : cfg.loaders(option, cfg),
		plugins: [
			new webpack.optimize.DedupePlugin(),// 去依赖重复
			/**
			 * webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
			 * */
			new webpack.optimize.OccurenceOrderPlugin(),
			/**
			 * 已有HTML自动生成公共部分
			 * new webpack.optimize.CommonsChunkPlugin({
				name     : 'Common',
				filename : cfg._js + "/Common." + cfg.version + ".js",
				minChunks: Infinity
			}),*/
			new ExtractTextPlugin(cssBundle, {
				allChunks: true
			}),
		],
		postcss: (function () {
			var arr = [autoprefixer({browsers: ['> 1%', 'last 5 versions', 'Firefox ESR'], cascade: false})];
			if (!!option.mobile) {
				var px2rem = require('postcss-px2rem');
				arr.push(px2rem({remUnit: 75}))
			}
			return arr;
		})(),
		
	};
	
	
	/**
	 * 获得路径
	 * @param globPath: str
	 * @param pathDir: str 对比路径
	 * @returns {{}}
	 */
	function getEntry(option) {
		var pathDir = option.pathDir,
				on_off  = option.on_off,
				files   = glob.sync(option.globPath);
		var entries = {},
				entry, dirName, baseName, pathName, extName;
		
		for (var i = 0; i < files.length; i++) {
			entry = files[i];
			dirName = path.dirname(entry);
			extName = path.extname(entry);
			baseName = path.basename(entry, extName);
			pathName = path.normalize(path.join(dirName, baseName));
			pathDir = path.normalize(pathDir);
			if (pathName.startsWith(pathDir)) {
				if (on_off) {
					/** 新添，针对同级目录的js,css管理
					 * demo/test/test=> demo/test
					 * */
					pathName = path.dirname(pathName);
				}
				pathName = pathName.substring(pathDir.length);
			}
			entries[pathName] = [entry];
		}
		return entries;
	}
	
	/**
	 * 合并对象
	 * 对象存在就合并，不存在就创建
	 * */
	function objConcat(obj1, obj2) {
		Object.keys(obj1).forEach(function (o) {
			if (!!obj2[o] && obj2[o] !== obj1[o]) {
				obj2[o] = obj2[o].concat(obj1[o]);
			}
			else {
				obj2[o] = obj1[o]
			}
		})
		return obj2;
	}
	
	/**
	 * 将项目中所有HTML加入到模块中
	 * */
	file_html.forEach(function (pathname) {
		var conf = {
			filename: pathname + '.html', //生成的html存放路径，相对于path
			template: path.resolve(cfg.html, pathname + '.' + cfg.type.html), //html模板路径
			minify  : {
				removeComments    : false, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
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
			var index = {}, i = 1,
					len           = conf.chunks.length;
			for (; i <= len; i++) {
				index[conf.chunks[len - i]] = i;
			}
			var aI = index[a.origins[0].name],
					bI = index[b.origins[0].name];
			return aI && bI ? bI - aI : -1;
		};
		config.plugins.push(new HtmlWebpackPlugin(conf));
	});
	return config;
};


