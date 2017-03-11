# 单元测试

## 开启配置
* 下载依赖
``` base
$ npm run installKarma
```
* 配置文件package.json
```
{
...
"scripts": {
"deploy": "npm run clean && npm run test && npm run dll && npm run build",
}
...
}
```
这样打包文件的时候就会自动进行测试。

## 注意
编写测试文件之后，通过以下命令最终打包到发布环境时。

``` base
$ npm run deploy
```
代码测试阶段，如果代码无法通过测试用例，说明代码存在问题，请寻找相关源码进行调试，否则无法正常打包。

## 说明

### 简单测试

通过以下命令会测试所有相关的测试文件
``` base
$ npm run test
```
测试完成后将会生成测试的相关文件

文件地址： `/build/coverage`

可通过 `/build/coverage/lcov-report/index.html` 查看具体数据

### 持续测试
通过以下命令可持续监听测试文件
``` base
$ npm run test:dev
```


## 文件测试范围

* 所有[`/tests`](/tests) 与 [`/app`](/app) 内的以xx.spec.js为后缀的文件都将被测试。

## 配置项

### 基础配置
引入自己喜欢的断言库
* 文件地址：[`/tests/bundler.js`](/tests/bundler.js)

### 深度定制
[官方API](http://karma-runner.github.io/1.0/config/configuration-file.html)
* 文件地址：[`/config/karma.conf.js`](/config/karma.conf.js)

## 学习资料
[chai官方文档](http://chaijs.com/api/)

[chai中文文档](http://jaywcjlove.github.io/handbook/html/%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7/chai.html#rd)

[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
