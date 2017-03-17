# avalon-webpack-start
[![Coverage Status](https://travis-ci.org/sayll/avalon-webpack-start.svg?branch=master)](https://travis-ci.org/sayll/avalon-webpack-start)  [![Coverage Status](https://coveralls.io/repos/github/sayll/avalon-webpack-start/badge.svg)](https://coveralls.io/github/sayll/avalon-webpack-start) [![Coverage Status](https://codeclimate.com/github/sayll/avalon-webpack-start/badges/gpa.svg)](https://codeclimate.com/github/sayll/avalon-webpack-start)

<b>React 用户请转至：[react-webpack-start](https://github.com/sayll/react-webpack-start)</b>

<b>低版本IE 用户请转至：[ie-webpack-start](https://github.com/sayll/ie-webpack-start)</b>

## 目录简介
1. [介绍](#介绍) 
2. [程序目录](#程序目录)
3. [项目启动](#项目启动)
    * [环境配置](#环境配置)
    * [依赖配置](#依赖配置)
    * [命令说明](#命令说明)
4. [使用手册](#使用手册)
    * [基本](#基本)
      * [创建HTML视图](#创建视图)
      * [引入DLL的JS](#引入DLL)
      * [配置JS,CSS资源文件](#配置资源文件)
    * [高级](#高级)
      * [使用框架(avalon2)或库(jquery)](#使用框架)
      * [引用字体图标Icon](#配置Icon)
      * [使用CSS预处理器、CDN或开启多文件路口main.js](#使用CSS预处理器)
      * [修改目录结构](#修改目录结构)
      * [单元测试](/docs/Tests.md)
    * [发布](#发布)  
5. [常见问题](/docs/Issue.md)
6. [更新日志](#更新日志)
7. [最重要的事情](#最重要的事情)

## 介绍
这个一个以webpack2为基础，启用tree-shaking新技术,多资源统筹的脚手架。</br>
本项目使用[`avalon2`](https://github.com/RubyLouvre/avalon)作为演示框架。

### 关于【Webpack】
1. 服务端使用Express。需要注意的是，只有一个目的那就是提供了`webpack-dev-middleware` 和 `webpack-hot-middleware`（代码热替换）。使用自定义的Express程序替换[webpack-dev-server](https://github.com/webpack/webpack-dev-server)，让它更容易实现universal 渲染和为了不使这个包过于庞大。
2. 针对不同的loader采用了多线程编译，极大的加快了编译速度。
3. 使用webpack.DllReferencePlugin打包框架和库。加快编译与打包速度。
4. 启动新技术tree-shaking
5. 提供测试框架进行单元测试，代码覆盖率报告，可与[Travis-ci](https://travis-ci.org)和[Coveralls](https://coveralls.io)快速对接。【[配置说明](https://github.com/sayll/Sayll_Karma)】
6. Babel被配置[babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)可以让代码更优化。

### 关于【HTML】
1. 支持单页应用和多页应用的混合开发。
2. 自动引入页面的CSS和JS文件。无需手动设置URL。(所有文件hash的改变都会导致文件名改变,这里的资源引用全由内部自动完成)
3. 如有使用常用的框架和库进行单独打包。(Dll),将需要单独引用dll的vendor.js;

### 关于【CSS】
1. css的模块化，预处理器的编译。（[支持`sass,scss,less,postcss`](#使用CSS预处理器)）
2. 针对低版本浏览器和其他浏览器内核的特殊性，启用[autoprefixer](https://github.com/postcss/autoprefixer)自动添加浏览器前缀
3. 针对移动开发，有独特的处理方案。（具体文档等待补充）
4. 可导入字体和字体图标，操作非常简单。（如[阿里系icon](http://www.iconfont.cn/)）【[配置文档](#配置Icon)】
5. 防缓存的hash规则

### 关于【JS】
1. 支持ES6的最新特性
2. 模块化，可才用ES6的import，也可用AMD规范的require
3. 防缓存的hash规则
4. 快速编译，自动刷新。
5. 将常用的框架和库进行单独打包。(Dll)防止重复引用，导致打包文件臃肿。
6. 提供公共脚本的文件入口，此文件将被所有页面自动引用。（可设置全局变量，引入公共的库。如Jquery）

## 程序目录

```
├── build                    # 所有打包配置项
├── config                   # 项目配置文件
│   ├── webpack              # webpack配置文件夹
│   └── karma.conf.js        # karma配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── app                      # 程序源文件
│   ├── html                 # 多页或单页应用的入口HTML
│   └──  source               # 公共的资源文件
│   ├    ├── css
│   ├    ├── js
│   ├    ├── font
│   ├    └── img             
│   ├── static               # 公共的静态资源文件(所有内部文件通过index.js引入，可配置全局变量。)
│   └── view                 # 主路由和异步分割点
│       └── index            # 匹配html文件夹中的index.html。（css,js文件名对应文件夹名，可直接打包无需单独引入）
│           ├── index.js     # 直接与index.html匹配的入口文件，可以作为单页应用的入口，在内部定义自己的项目目录
│           ├── index.css    # 如是多页应用，可设置对应的CSS文件，直接匹配。
│           └── other **     # 页面的其他资源文件，通过index.js引入
└── tests                    # 单元测试
```

## 项目启动

### 环境配置
* 为了把保证项目正常运行，请自行更新相关环境。 
1. 安装[node.js](https://nodejs.org/)
2. 安装[git](https://git-scm.com/)
3. 安装[Yarn](https://yarnpkg.com/zh-Hans/)（可选）

### 依赖配置
1. 首先clone项目
```bash
$ git clone https://github.com/sayll/avalon-webpack-start.git
$ cd avalon-webpack-start
```
* 由于国内有一堵高墙的存在建议国内用户切换源地址：
```bash
$ npm run cnpm
```
以后请使用`cnpm`替代`npm`操作
2. 下载依赖
* 请确保你的环境配置完成，然后就可以开始以下步骤
  * `npm` 用户：
  ```bash
  $ npm install                   # Install project dependencies
  $ npm start                     # Compile and launch
  ```
  * `cnpm` 用户：
  ```bash
  $ cnpm install                   # Install project dependencies
  $ npm start                     # Compile and launch
  ```
  * `Yarn` 用户：
  ```bash
  $ yarn                          # Install project dependencies
  $ yarn start                    # Compile and launch
  ```
如果一切顺利,就能正常打开端口:[http://localhost:3000/](http://localhost:3000/)

### 命令说明

开发过程中，你用得最多的会是`npm run dev`，但是这里还有很多其它的处理：

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|第一次运行启用。生成DLL文件，服务启动在3000端口，代码热替换开启。|
|`dev`|与`npm start`类似相同,只有当DLL文件存在时可用。加快开发速度。|
|`build`|同`dev`在DLL文件存在时，加快打包速度。|
|`deploy`|删除旧文件，生成新DLL，打包相关文件（默认目录~/build）。|
|`test`|开启Karma测试并生成覆盖率报告。(默认关闭：[启动配置](/docs/Tests.md))|
|`visualizer`|打包资源分析|
|`clean`|清除打包的文件|
|`cnpm`|替换为淘宝镜像|
|`dll`|适合第一次启动时运行，生成DLL文件。|
* 第一次运行使用 `start`,后续调试使用`dev`
* 打包推荐使用`deploy`
* 目前所有相关开发打包都需依赖`dll`,当不清楚或运行出错时，尝试运行一下`npm run dll`,再完成接下来的操作。

## 使用手册

### 基本

1. <a name='创建视图'>创建HTML视图</a>,文件地址：[`app/html`](/app/html)
    * 创建单页应用，只需一个入口文件`index.html`即可。
2. <a name='引入DLL'>引入DLL的JS</a>,默认地址为`<script src="./dll/vendor.js"></script>`
3. <a name='配置资源文件'>配置JS,CSS资源文件</a>，文件地址：[`app/view`](/app/view)

    一. 创建html文件`app/html/demo.html`时，配置view中的资源文件：
    
    * `app/view/demo/demo.js`
    * `app/view/demo/demo.css`
    
    二. 创建html文件`app/html/test/index.html`时，配置view中的资源文件：
    
    * `app/view/test/index/index.js`
    * `app/view/test/index/index.css`
    
    三. 创建单页应用`app/html/index.html`时，配置view中的资源文件：
    
    * `app/view/index/index.js`
    * `app/view/index/index.css`
    * 在`app/view/index`中管理其他资源文件，通过唯一的文件入口`index.js`来引入其他资源文件

### 高级

1. <a name='使用框架'>使用框架(avalon2)或库(jquery)</a>
  * 首先安装依赖
  ```bash
  $ npm install avalon2
  ```
  
  * 配置Dll文件，地址：[`config/webpack/webpack.dll.js`](/config/webpack/webpack.dll.js)
  ```js
  const vendors    = [
    'avalon2'
  ];
  ```
  
  * 配置全局调用变量，地址：[`app/static/index.js`](/app/static/index.js)
  ```js
  // 由于avalon2内部自己解决绑定window对象，所以无需其他处理，直接引入即可。
  import 'avalon2';
  ```
2. <a name='配置Icon'>引用字体图标Icon</a>
  * 引入字体文件
  文件地址：[app/source/css/index.css](/app/source/css/index.css) <br />
    * 添加字段： `@import "../font/icon/iconfont.css`

  * 构建自己的icon文件
    * 构建自己的Icon文件：[http://www.iconfont.cn/](http://www.iconfont.cn/)
  
  * 替换文件地址：[app/source/font/icon](/app/source/font/icon)
    * 直接将构建好的文件，替换原先旧文件即可
3. <a name='使用CSS预处理器'>使用**CSS预处理器**、**CDN**或开启多文件路口**main.js**</a>
  * 修改配置文件
  文件地址：[config/webpack/base/base.js](/config/webpack/base/base.js)
    * CSS预处理器修改项： `cssType`
    
      * 使用`less`下载依赖
        ```bash
        $ npm install less-loader less        # npm用户
        $ cnpm install less-loader less       # cnpm用户
        $ yarn add less-loader less           # yarn用户
        ```
        
      * 使用`sass|scss`下载依赖
        ```bash
        $ npm install sass-loader node-sass       # npm用户(由于墙的原因会有很大一部分人会失败，推荐使用cnpm)
        $ cnpm install sass-loader node-sass      # cnpm用户
        $ yarn install sass-loader node-sass      # yarn用户
        ```
        
      * 样式文件后缀需要与`cssType`对应;
         * 如使用`less`，请将`app`内部所有的样式文件后缀修改为`.less`
        
    * CDN修改项： `cdnPath`
    * main.js修改项: `mainJS`  
      * 文件地址：[app/source/js/main.js](/app/source/font/icon)
    ```js
    module.exports = {
      mainJS  : false, // 添加公共main.js
      devHost : '0.0.0.0',
      devPort : '3000',
      viewType: 'html', // pug,jade,html...
      cssType : 'css', // sass,scss,less,pcss,css...
      cdnPath : './', // 资源指向位置,可寄放CDN
    };
    ```
    
4. <a name='修改目录结构'>修改目录结构</a>
  * 文件地址: [`config/webpack/base/files.js`](/config/webpack/base/files.js)
    *  此文件使webpack正确索引资源文件，如需调整资源目录，请使目录资源与`files.js`中的配置一一对应。
          具体请查看源码
5. 单元测试([更多说明](/docs/Tests.md))

### 发布
1. 打包命令
```bash
$ npm run build
```
或
```bash
$ npm run deploy
```
* 二者区别
  * `build`是在DLL存在是，才能正常打包。速度最快，安全系数觉低。（怕Dll依赖改变，而沿用旧Dll）
  * `deploy`是保守的打包方式，从删除旧目录到打包Dll，最后生成其他的资源文件。速度较慢，安全系数高。
  * 当单元测试功能开启时，`deploy`将添加一个检测项。只有所有测试通过时，才能正常打包。速度慢，安全系数最高。（默认关闭，开启请参考：[启动配置](/docs/Tests.md)）
2. 打包文件为`build`文件夹，请以此为根目录。

## 常见问题

[常见问题](/docs/Issue.md)

## 更新日志

[更新详情](/docs/Update.md)

## 最重要的事情

* 亲不要吝啬自己的**Star**，右上角**Star**一下呗。

<a href="https://segmentfault.com/a/1190000008249713"><img src='https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=405cc666d543ad4ba67b4ec6b2327697/d058ccbf6c81800a80b7b2cdb53533fa838b47a6.jpg' height='160'></a>

