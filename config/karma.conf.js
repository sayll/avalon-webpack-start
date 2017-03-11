const files = require('./webpack/base/files');

const debug = process.env.NODE_TEST === 'development';

module.exports = cfg => cfg.set({
  basePath: '../',
  exclude: [],
  frameworks: ['mocha'],
  reporters: ['coverage', 'progress'],
  files: [
    `${files.appName}/**/*.spec.js`,
    `${files.testName}/**/*.spec.js`,
    {
      pattern: `${files.testName}/bundler.js`,
      watched: false,
      served: true,
      included: true,
    },
  ],
  preprocessors: {
    [`${files.testName}/**/*.js`]: ['webpack'],
    [`${files.appName}/**/*.spec.js`]: ['webpack'],
  },
  // 端口号
  port: 9876,
  // 输出带颜色
  colors: true,
  /**
   * 打印的消息 possible values:
   * config.LOG_DISABLE
   * config.LOG_ERROR
   * config.LOG_WARN
   * config.LOG_INFO
   * config.LOG_DEBUG
   * */
  logLevel: cfg.LOG_INFO,
  // 是否改动代码自动刷新页面
  autoWatch: debug,
  // 测试完成，是否关闭浏览器
  singleRun: !debug,
  // 需要测试的浏览器
  browsers: ['PhantomJS'],
  // 超时退出
  captureTimeout: 60000,
  webpack: {
    /**
     * target: 'node',
     * node: {fs: 'empty'},
     * */
    resolve: require('./webpack/modules/resolve'),
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: require('./webpack/modules/babel'),
      }],
    },
    /**
     * externals: {
       * 'react/addons': true,
       * 'react/lib/ExecutionEnvironment': true,
       * 'react/lib/ReactContext'        : true
       * },
     * */
    devtool: 'inline-source-map',
  },
  webpackMiddleware: {
    noInfo: true,
  },
  // 覆盖率报告要如何生成
  coverageReporter: {
    dir: `${files.buildPath}/coverage`,
    reporters: [{
      type: 'json',
      subdir: '.',
      file: 'coverage.json',
    }, {
      type: 'lcov',
      subdir: '.',
    }, {
      type: 'text-summary',
    }],
  },
});
