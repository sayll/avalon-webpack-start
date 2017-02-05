# Webpack配置

## base文件说明

```js
module.exports = {
  mainJS  : false, // 添加公共main.js
  devHost : '0.0.0.0',
  devPort : '1000',
  viewType: 'html', // pug,jade,html...
  cssType : 'pcss', // sass,scss,less,pcss,css...
  cdnPath : '/', // 资源指向位置,可寄放CDN
  version : '1.0.0' // 输出资源带版本号
};
```
###
|配置项|解释|参数|
|------------------|-----------|-----------|
|`mainJS`|默认不开放，当[`app/static/index.js`](/app/static/index.js)模块过多，无法满足你的要求时，开放第二个公共入口|`true`or`false`|
|`devHost`|建议保持不变||
|`devPort`|端口号|最好4位数字|
|`viewType`|模版引擎|自由选择，默认原生HTML|
|`cssType`|css预处理器|默认使用postcss(接近原生)|
|`cdnPath`|资源指向位置,可寄放CDN|默认使用本地资源|
|`version`|版本号|资源文件打包，自带版本号后缀|

## files文件说明

文件地址: [`config/webpack/base/files.js`](/config/webpack/base/files.js)

此文件使webpack正确索引资源文件，如需调整资源目录，请使目录资源与`files.js`中的配置一一对应。
具体请查看源码

```js
{
  root         : process.cwd(), /*根目录*/
  appName      : 'app',
  buildName    : 'build', /*打包文件*/
  componentName: 'component', /*公共组件文件*/
  htmlName     : 'html', /*视图文件*/
  cssName      : 'source/css', /*公共样式文件*/
  fontName     : 'source/font', /*公共字体文件*/
  imgName      : 'source/img', /*公共图片文件*/
  jsName       : 'source/js', /*公共脚本文件*/
  staticName   : 'static', /*静态资源包文件*/
  viewName     : 'view', /*视图模板文件*/
  testName     : 'tests' /*测试文件*/
}
```
