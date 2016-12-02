if (!window.Promise) {
	window.Promise = require('babel-runtime/core-js/promise')['default'];
	require('babel-runtime/core-js/promise')['default'] = require('bluebird');
}

import '../css/main.scss';

/**
 * 图片延迟加载
 * */
import * as echo from '../../static/lib/tools/echo/echo';
echo.init({
	offset  : 100,
	throttle: 250,
	debounce: false, // 滚动条是否结束触发
	unload  : false,// 是否删除 data-echo
	callback: function (element, op) {
		//config.debug ? console.log(element, 'has been', op + 'ed') : '';
	}
});

/**
 * Config
 * */
import {cfg, _} from '../../static/config/index';
[window.cfg, window._] = [cfg, _];


