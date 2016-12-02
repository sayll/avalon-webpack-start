module.exports = function (option, cfg) {
	var DEBUG = !!option.debug;
	return {
		noParse    : ['node_modules', /moment-with-locales/],
		perLoaders : [],
		loaders    : [
			{
				test   : /\.scss$/,
				include: [cfg.view, cfg.css],
				loader : DEBUG ? cfg.pkg.ExtractTextPlugin.extract('css?sourceMap!postcss!sass') : cfg.pkg.ExtractTextPlugin.extract('css!sass!postcss')
			},
			{
				test   : /\.(html)$/,
				include: cfg.component,
				loader : 'text'
			},
			{
				test   : /\.pug$/,
				include: [cfg.view, cfg.html],
				loader : 'pug'
			},
			{
				test   : /\.(pug)$/,
				include: cfg.component,
				loader : 'text!pug'
			},
			{
				test   : /\.(js|jsx)$/,
				include: [cfg.js, cfg.view, cfg.static],
				loader : 'babel', //解析 es6
				query  : {
					presets       : (function () {
						var presets = ['es2015', 'stage-0'];
						if (option.react) {
							presets.push('react');
						}
						return presets;
					})(),
					cacheDirectory: true,
					//在开发的时候才启用HMR和Catch Error
					env           : (function () {
						var development = {
							'plugins': ['transform-runtime']
						}
						if (DEBUG) {
							return {
								"development": Object.assign(development, {"presets": ["react-hmre"]})
							}
						}
						else {
							return {
								"development": development
							}
						}
					})()
				}
			},
			{
				test   : /\.json$/,
				include: [cfg.static, cfg.view],
				loader : 'json'
			},
			{
				test   : /\.(woff|svg|eot|ttf)\??.*$/,
				include: cfg.font,
				loader : 'url-loader?limit=51200&name=' + cfg._font + '/[name]-[hash:8].[ext]'
			},
			{
				test   : /\.(png|jpg|jpeg|gif)$/,
				include: [cfg.img, cfg.view],
				loaders: ['url-loader?limit=1024&name=' + cfg._img + '/[name]-[hash:8].[ext]', 'image-webpack']
			}],
		postLoaders: []
	}
};