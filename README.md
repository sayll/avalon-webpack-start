# Karma - Mocha
[![Coverage Status](https://travis-ci.org/sayll/Karma-Mocha.svg?branch=master)](https://travis-ci.org/sayll/Karma-Mocha)  [![Coverage Status](https://coveralls.io/repos/github/sayll/Karma-Mocha/badge.svg?branch=master)](https://coveralls.io/github/sayll/Karma-Mocha?branch=master)

## 说明
* Karma-mocha是一个前端单元测试脚手架
* 它可以选择浏览器测试环境，完成自动化前端单元测试。
* 它可以与[Travis-ci](https://travis-ci.org)和[Coveralls](https://coveralls.io)完成对接
* 迫不及待了吗？那么让我们进入正题吧！

## 工具介绍

### Runner
  * 这里我们使用的Runner工具就是Google Angular 团队推出的 **karma**;
  * **Karma**是一个测试集成框架，可以方便地以插件的形式集成测试框架、测试环境、覆盖率，[以及其他非常多的定制](https://karma-runner.github.io/1.0/config/configuration-file.html);
    
###测试框架
  * 测试框架有很多:
    * [mocha](http://mochajs.org/)：它的作者就是在Github上粉丝6K的超级Jser TJ Holowaychuk，可以在他的页面上看到过去一年的提交量是5700多，拥有300多个项目，无论是谁都难以想象他是如何进行coding的。
    * [Jasmine](https://jasmine.github.io/)：有一类框架叫做xUnit，来源于著名的JAVA测试框架JUnit，xUnit则代表了一种模式，并且使用这样的命名。在Javascript中也有这样的一个老牌框架JsUnit，他的作者是Edward Hieatt来自Pivotal Labs，但在几年前JsUnit就已经停止维护了，他们带来了新的BDD框架Jasmine。
    * [qunit](http://qunitjs.com/)：它是由jQuery团队开发的一款测试套件，最初依赖于jQuery库，在2009年时脱离jQuery的依赖，变成了一个真正的测试框架，适用于所有Javascript代码。
    * [Jest](http://facebook.github.io/jest/)：Jest源于Facebook两年前的构想，用于快速、可靠地测试Web聊天应用。它吸引了公司内部的兴趣，Facebook的一名软件工程师Jeff Morrison半年前又重拾这个项目，改善它的性能，并将其开源。
    * [Sinon](http://sinonjs.org/)：Sinon并不是一个典型的单元测试框架，更像一个库，最主要的是对Function的测试，包括 Spy 和 Stub 两个部分，Spy用于侦测Function，而Stub更像是一个Spy的插件或者助手，在Function调用前后做一些特殊的处理，比如修改配置或者回调。它正好极大的弥补了Qunit的不足，所以通常会使用Qunit+Sinon来进行单元测试。
  * 这里，我们使用**mocha**，其他测试框架暂不做任何评论;
  
###断言库
  * 断言库也有很多的选择，其中比较有名气的有：
    * expect
    * should
    * chai
  * 此处使用chai，具体使用可参考[阮前辈的文章](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html) 
  
## 插件使用
* 测试所需插件大致如下：
 * karma：框架本体
 * mocha：测试框架
 * chai：断言库
 * karma-cli：全局安装（可直接通过karma start进行测试）
 * karma-mocha：Mocha测试框架
 * karma-coverage：覆盖率测试
 * karma-phantomjs-launcher：PhantomJS环境
 * phantomjs-prebuilt: PhantomJS最新版本
 * karma-ie-launcher：Ie环境
 * karma-chrome-launcher：Chrome环境
 * karma-firefox-launcher：Firefox环境
 * babel-plugin-istanbul：处理测试覆盖率可靠性（因为webpack打包，使之不可靠）
 * karma-webpack：可以让测试支持ES6
 * babel，babel-core，babel-loader，babel-preset-es2015：ES6所需要的包支持
 * webpack
 * mocha-loader：预处理
  
## karma.conf.js配置
代码中有相关备注，为了减少篇幅，这里不做过多解释。如果有兴趣的同志，可以自行翻阅源码。

## 接通[Travis-ci](https://travis-ci.org)与[Coveralls](https://coveralls.io)

### [Travis-ci](https://travis-ci.org)
 * [Travis-ci](https://travis-ci.org)官网登录，绑定github账号。
 * 点击自己的头像进行个人资料界面，在下面你的项目中，点击你所需要自动构建的项目前的按钮，这个按钮就会变成绿色的勾
 * 在点击到自己的用户信息界面之后，在你的Repo上面会有一个简单的使用介绍，开启Travis-CI是很简单的。
 * 状态图标，在点击左侧`My Repositories`，选中相关项目。在项目标题右边，点击状态图标会出现图标URL；可以添加到md文件显示测试结果;
 `[![Coverage Status](https://travis-ci.org/sayll/Karma-Mocha.svg?branch=master)](https://travis-ci.org/sayll/Karma-Mocha)`  [![Coverage Status](https://travis-ci.org/sayll/Karma-Mocha.svg?branch=master)](https://travis-ci.org/sayll/Karma-Mocha)
 * 在你的项目根目录新建.travis.yml文件，参考仓库中的代码片段
   * language: 你项目所用的语言
   * node_js: 这个底下是自动构建所使用的环境。（注意：有固定的格式）
   * before_script: 在正式script之前运行的脚本(Shell)命令
   * install: 下载的依赖；（重要，代码片段`npm install coveralls`为最终[Coveralls](https://coveralls.io)接收代码覆盖率）
   * script：开始测试所用的命令（默认为npm test）
   * after_script: 在测试结束之后运行的命令，比如用于导出结果到COVERALLS

###[Coveralls](https://coveralls.io)
* [Coveralls](https://coveralls.io)官网登录。
 * 左侧，`ADD REPOS`;由OFF指向ON；
 * 如果没有你要的项目可点击右下角`REFRESH PRIVATE REPOS`
 * 如果你的项目不是`Travis Pro`就可以直接点击项目，找到`BADGE`，把自己需要的图标地址复制到md文件中，or其它地址;
 `[![Coverage Status](https://coveralls.io/repos/github/sayll/Karma-Mocha/badge.svg?branch=master)](https://coveralls.io/github/sayll/Karma-Mocha?branch=master)`  [![Coverage Status](https://coveralls.io/repos/github/sayll/Karma-Mocha/badge.svg?branch=master)](https://coveralls.io/github/sayll/Karma-Mocha?branch=master)
 * 如果是`Travis Pro`，你就按照官网说明添加`.coveralls.yml`文件;填写相关token;

### 使用说明
* 下载本脚手架
* 下载相关运行包
  * 正常运行npm install 
  * 如果使用阿里镜像的cnpm: cnpm install 
  * 如果使用yarn：yarn install
* 运行测试：karma start(注：如果无法运行，请全局安装karma-cli：`npm install karma-cli -g`)
* 之后你push文件的时候就会自动通过`Travis-ci`服务运行 `karma start`;然后运行Coveralls;最后导出结果。改变md中的测试图标;

### 参考文章
* [【持续集成你的项目】为你的项目创建自动化测试和代码覆盖率测试](https://segmentfault.com/a/1190000005090444#articleHeader8)
* [关于前端开发谈谈单元测试](http://www.tychio.net/tech/2013/07/10/unit-test.html)
* [一个靠谱的前端开源项目需要什么？](https://segmentfault.com/a/1190000005859766#articleHeader12)
* [现代JS代码测试流程](https://segmentfault.com/a/1190000003869696)
* [聊一聊前端自动化测试 #37](https://github.com/tmallfe/tmallfe.github.io/issues/37)

### 喜欢的请点一下右上角的 `STAR`
