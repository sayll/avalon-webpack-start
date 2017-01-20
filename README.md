# webpack2-Scaffolding
[![Coverage Status](https://travis-ci.org/sayll/webpack2-Scaffolding.svg?branch=master)](https://travis-ci.org/sayll/webpack2-Scaffolding)  [![Coverage Status](https://coveralls.io/repos/github/sayll/webpack2-Scaffolding/badge.svg)](https://coveralls.io/github/sayll/webpack2-Scaffolding)
## 说明

webpack2脚手架,抢先预览版。

这个启动包的针对单页应用和多页应用做了特殊处理，可以混合开发。所有都是可配置，富特性，基于webpack已经提供代码热加载，使用postCss(可添加替换sass,less)预处理css，代码分割等等更多。（下一步是：完善单元测试，代码覆盖率报告）

如果大家有更好的想法及建议请提Issues。

* 觉得不错的话，请Star一下本项目，这是对作者最大的支持。

## 开始

确认好你的环境配置，然后就可以开始以下步骤。

```bash
$ git clone https://github.com/sayll/webpack2-Scaffolding.git
$ cd webpack2-Scaffolding
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```
关于package.json中dependencies的相关依赖，请自行下载。本例子以react为框架

如果一切顺利,就能正常打开端口:127.0.0.1:1000

开发过程中，你用得最多的会是`npm start`，但是这里还有很多其它的处理：

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|第一次运行启用。生成DLL文件，服务启动在1000端口，代码热替换开启。|
|`deploy`|删除旧文件，生成新DLL，打包相关文件（默认目录~/build）。|
|`dev`|与`npm start`类似相同,只有当DLL文件存在时可用。加快开发速度。|
|`test`|开启Karma测试并生成覆盖率报告。|
|`visualizer`|打包资源分析|
|`build`|同`dev`在DLL文件存在时，加快打包速度。|
|`clean`|清除打包的文件|
|`cnpm`|替换为淘宝镜像|
|`dll`|适合第一次启动时运行，生成DLL文件。|
* 第一次运行，推荐使用 `start`,后续调试使用`dev`
* 打包推荐使用`deploy`
* 目前所有相关开发打包都需依赖`dll`,当不清楚或运行出错时，尝试运行一下`npm run dll`,再完成接下来的操作。

## 程序目录


```
.
├── build                    # 所有打包配置项
├── config                   # 项目配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── app                      # 程序源文件
│   ├── html                 # 多页或单页应用的入口HTML
│   ├── source               # 公共的资源文件
│   ├── static               # 静态文件(不要到处imported源文件，所有内部文件通过index.js引入，配置后单独打包)
│   └── view                 # 主路由和异步分割点
│       └── index            # 匹配html文件夹中的index.html。（css,js文件名对应文件夹名，可直接打包无需单独引入）
│           ├── index.js     # 直接与index.html匹配的入口文件，可以作为单页应用的入口，在内部定义自己的项目目录
│           ├── index.css    # 如是多页应用，可设置对应的CSS文件，直接匹配。
│           └── other **     # 页面的其他资源文件，通过index.js引入
└── test                     # 单元测试（日后调整，待开发ing）
```

## 样式

使用[PostCSS](https://github.com/postcss/postcss)(可添加替换sass,less)预处理css

## 服务端

这个项目的服务端使用Koa。需要注意的是，只有一个目的那就是提供了`webpack-dev-middleware` 和 `webpack-hot-middleware`（代码热替换）。使用自定义的Koa程序替换[webpack-dev-server](https://github.com/webpack/webpack-dev-server)，让它更容易实现universal 渲染和为了不使这个包过于庞大。

## 打包优化

Babel被配置[babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)可以让代码更优化。dll文件加速打包和开发速度。资源的特殊匹配，避免引入无关的包文件。

### 后续功能将慢慢完善，文档方面也会补全。案例也会编写。敬请期待！

