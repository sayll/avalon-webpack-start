# Sayll_webpack
[![Coverage Status](https://travis-ci.org/sayll/Karma-Mocha.svg?branch=master)](https://travis-ci.org)  [![Coverage Status](https://coveralls.io/repos/github/sayll/Karma-Mocha/badge.svg?branch=master)](https://coveralls.io)

## 说明
* Sayll_webpack:前端自动化构建模版;
* 它支持页面自动刷新;
* 支持ES6新特性，最后打包转义为ES5代码;
* 支持SCSS编写CSS代码，当然也可以使用Less及SASS，只要修改部分代码就能跑;
* 支持PUG前端的模版引擎，当然也可以单纯只使用HTML，只需要修改一个配置文件;
* 所有最终生成的JS，CSS文件都会自动添加到HTML里。
* webpack模块化开发，所有img,json,js,html,pug,css,font都能require引入;
* 还引入了手机开发模式，移动端自适应方案;需要一个配置就能开启;(方案来源于[px2rem](https://github.com/songsiqi/px2rem)+[lib-flexible](https://github.com/amfe/lib-flexible))
* 在同一局域网内，可直接打开测试页面;（默认地址为：http://127.0.0.1:1000/）
* **最重要的是，它是支持文件修改前后对比，给它最后生成的文件名打上hash;保证页面的url永远为最新。避免缓存带来的影响;**
* 迫不及待了吗？那么让我们进入正题吧！

## 目录结构
* `|——app` 项目根
* `|——|——component` 自定义组件
* `|——|——html` 打包视图
* `|——|——source` 资源文件
* `|——|——|——css`
* `|——|——|——js`
* `|——|——|——font`
* `|——|——|——img`
* `|——|——static` 静态文件（含JS库和框架，模拟的接口数据等）
* `|——|——|——config`
* `|——|——|——json`
* `|——|——|——lib`
* `|——|——view` 针对html文件，对应文件夹名，此内的3类文件会被打包进最终生产的HTML
* `|——|——|——index`
* `|——|——|——|——index.pug` 此文件可选（如果使用传统的HTML编写则删除）
* `|——|——|——|——index.js` 此文件可选（纯静态，无脚本可删除）
* `|——|——|——|——index.scss` 此文件可选（无特殊样式编写可删除）
* `|——|——webpack_config`
* `|——|——|——base`
* `|——|——|——|——config.js` 相关webpack包引入，及地址配置
* `|——|——|——|——loaders.js` webpack中loaders配置
* `|——|——|——webpack.base.config.js` webpack基础配置
* `|——|——|——dev.config.js` webpack本地测试运行配置
* `|——|——|——build.config.js` webpack打包配置
* `|——|——package.json` **此为入口配置文件:** 根文件目录结构依赖与此文件，具体查看此文件的config参数
* `|——.gitignore`
* `|——package.json` **此为运行与依赖配置文件:** 稍后介绍
* `|——README.md`


## 使用说明 （所有配置修改都基于**app目录内的package.json**中配置）
* 下载本脚手架
* 下载相关运行包
 * 正常运行 **npm install**
 * 如果使用yarn：**yarn install** 
 * 如果npm之类的下不动，就先 **npm run cnpm** 下载阿里镜像
 * 然后 **cnpm install**
* 运行开发： npm run dev （默认测试网址为：http://127.0.0.1:1000/）
 * 端口配置修改：config > devPort:1000
 * 如果为纯HTML开发,请将此处：config > type > html : 'html'
 * mobile默认为关闭: config > mobile : false; 为开启移动端自适应，只使用于手机端，才用rem开发;（才用方案[px2rem](https://github.com/songsiqi/px2rem)+[lib-flexible](https://github.com/amfe/lib-flexible)）
* 运行打包： npm run build
 * 打包输出地址修改：config > buildDir ：'dist/'
 * 如果将source内的资源文件放cdn时，修改： config > sourcePath : "/" （指定到域名,默认为相对跟域名下）
* PS:如需自定义文件目录，请参考 **config > app** 修改目录后，请将其指向正确的目录地址;app为根节点
 * 当你的目录文件发生变化时，请留意**app同级目录的package.json**
 * scripts > build 与 scripts > dev 中文件是否正确指向 **build.config** 与 **dev.config**
  
## 其他
* 如需进行前端单元测试，可搭配 [Sayll_Karma](https://github.com/sayll/Sayll_Karma)
* 如需React开发模版，可查看 [Sayll_React](https://github.com/sayll/Sayll_React)

###喜欢的请点一下右上角的 `STAR` 如有问题，请提`issue`
* 重点提一下，如果为库或者不常改变的库，建议直接在app > static > lib > index.js中引入;
* webpack 会单独将固定不变的此index.js单独打包为一个文件;
* 而需要修改的公共代码，请在app > source > js > main.js中编写;
* webpack会根据文件修改，自动在文件名中打上hash;
