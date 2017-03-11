const path = require('path');

module.exports = ((filesName) => {
  const files = filesName;
  const appPath = path.resolve(files.root, files.appName);
  files.appPath = appPath;
  files.buildPath = path.resolve(files.root, files.buildName);
  files.dllPath = path.resolve(files.root, `${files.buildName}/dll`);
  files.jsPath = path.resolve(appPath, files.jsName);
  files.cssPath = path.resolve(appPath, files.cssName);
  files.imgPath = path.resolve(appPath, files.imgName);
  files.fontPath = path.resolve(appPath, files.fontName);
  files.viewPath = path.resolve(appPath, files.viewName);
  files.testPath = path.resolve(appPath, files.testName);
  files.htmlPath = path.resolve(appPath, files.htmlName);
  files.staticPath = path.resolve(appPath, files.staticName);
  files.componentPath = path.resolve(appPath, files.componentName);
  return files;
})({
  root: process.cwd(), // 根目录
  appName: 'app',
  buildName: 'build', // 打包文件
  componentName: 'component', // 公共组件文件
  htmlName: 'html', // 视图文件
  cssName: 'source/css', // 公共样式文件
  fontName: 'source/font', // 公共字体文件
  imgName: 'source/img', // 公共图片文件
  jsName: 'source/js', // 公共脚本文件
  staticName: 'static', // 静态资源包文件
  viewName: 'view', // 视图模板文件
  testName: 'tests', // 测试文件
});
