# avalon-webpack-start
[![Coverage Status](https://travis-ci.org/sayll/avalon-webpack-start.svg?branch=master)](https://travis-ci.org/sayll/avalon-webpack-start)  [![Coverage Status](https://coveralls.io/repos/github/sayll/avalon-webpack-start/badge.svg)](https://coveralls.io/github/sayll/avalon-webpack-start) [![Coverage Status](https://codeclimate.com/github/sayll/avalon-webpack-start/badges/gpa.svg)](https://codeclimate.com/github/sayll/avalon-webpack-start)

<b>Vue 用户请转至：[vue-start](https://github.com/sayll/vue-start)</b>

<b>React 用户请转至：[react-webpack-start](https://github.com/sayll/react-webpack-start)</b>

<b>低版本IE 用户请转至：[ie-webpack-start](https://github.com/sayll/ie-webpack-start)</b>

<b>旧版脚手架[v2.1.0](https://github.com/sayll/avalon-webpack-start/tree/v2.1.0)

## 介绍
本版本删减了许多模块及功能，让脚手架更轻型，更易扩展，自定义。
本项目使用[`avalon2`](https://github.com/RubyLouvre/avalon)作为演示框架,演示如何进入开发。

### 关于本项目功能
1. 服务端使用Express。需要注意的是，只有一个目的那就是提供了`webpack-dev-middleware` 和 `webpack-hot-middleware`（代码热替换）。使用自定义的Express程序替换[webpack-dev-server](https://github.com/webpack/webpack-dev-server)，让它更容易实现universal 渲染和为了不使这个包过于庞大。
2. 针对不同的loader采用了多线程编译，极大的加快了编译速度。
3. 使用webpack.DllReferencePlugin提取固定资源，加快编译与打包速度。
4. 启动tree-shaking
5. 启动webpack3版本：作用域提升功能
6. Babel配有transform-runtime让代码更优化。
7. 支持单页应用和多页应用的混合开发
8. 自动引入页面的CSS和JS文件。无需手动设置URL
9. 更改文件,防缓存的hash规则
10. css的模块化，默认使用postcss + postcss-cssnext，内置处理浏览器前缀。[查看更多](http://cssnext.io/）
11. 全面支持ES6的最新特性，打包转义为ES5为低版本浏览器提供支持
12. 快速编译，热更新，自动刷新

## 程序目录

```
├── dist                     # 打包资源
├── internals                # 项目配置文件
│   ├── webpack              # webpack配置文件夹
│   └── index.js             # 公共配置文件
├── static                   # 静态资源,直接绕过打包
├── app                      # 程序源文件
└── .cache-loader            # 启动服务后的缓存文件，用于下次快速启动服务
```

## 项目启动

### 环境配置
* 为了把保证项目正常运行，请自行更新相关环境。
1. 安装[node.js](https://nodejs.org/)
2. 安装[git](https://git-scm.com/)

### 依赖配置
1. 首先clone项目
```bash
$ git clone https://github.com/sayll/avalon-webpack-start.git
$ cd avalon-webpack-start
```

2. 下载依赖
* 请确保你的环境配置完成，然后就可以开始以下步骤
  ```bash
  $ npm install                   # Install project dependencies
  $ npm start                     # Compile and launch
  ```
如果一切顺利,就能正常打开端口:[http://127.0.0.1:3001/](http://127.0.0.1:3001/)

## 命令说明

开发过程中，你用得最多的会是`npm run dev`，但是这里还有很多其它的处理：

|`npm run <script>`|Explain|
|------------------|-----------|
|start|初始化启动项目（生成Dll文件并启动服务）|
|dll|生成依赖文件（Dll）|
|dev|快速启动项目（生成Dll文件下，可加快启动服务）|
|bundle|打包资源分析仪|
|build|打包测试环境资源|
|deploy|打包生产环境资源|

* 第一次运行使用 `start`,后续调试使用`dev`

## 使用手册

* 项目目录`app`中`views`目录内新建文件夹，文件夹名称即为HTML的名称
* 文件内的index.html, index.js, index.css将会被自动索引，打包到资源中
* `static`目录为静态文件目录，可直接通过'/static/*'访问到资源
* 项目默认关闭eslint，如需开启请到`internals/index.js`配置。
* 项目中使用的各类库请直接到`internals/index.js`中的vendors配置。

> 更多修改配置请参考`internals/index.js`
