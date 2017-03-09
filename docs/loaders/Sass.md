# Sass

## 安装依赖
```bash
$ npm install sass-loader node-sass
```

* 由于国内墙的原因，可能某些用户无法正常下载node-sass。所以推荐使用阿里的镜像
```bash
$ npm install cnpm -g --registry=https://registry.npm.taobao.org
$ cnpm install sass-loader node-sass
```

## 修改配置文件
文件地址：[config/webpack/base/base.js](/config/webpack/base/base.js)
* 重点：
  * 修改项： `cssType`
  * 样式文件后缀需要与`cssType`对应;

```js
module.exports = {
  devHost : '0.0.0.0',
  devPort : '3000',
  viewType: 'html',
  // 此处配置针对Css预处理器
  cssType : 'sass', /* sass,scss,less,pcss,css...*/
  cdnPath : '/',
  version : '1.0.0'
};
```