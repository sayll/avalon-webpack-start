const path = require('path');

module.exports = (() => {
  let files   = {
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
  };
  let appPath = path.resolve(process.cwd(), files.appName);
  Object.assign(files, {
    appPath      : appPath,
    buildPath    : path.resolve(files.root, files.buildName), /*输出文件地址and名*/
    dllPath      : path.resolve(files.root, files.buildName + '/dll'), /*长期不变动代码，忽略打包。加速DEV模式*/
    jsPath       : path.resolve(appPath, files.jsName), /*开发JS地址*/
    cssPath      : path.resolve(appPath, files.cssName), /*开发CSS地址*/
    imgPath      : path.resolve(appPath, files.imgName), /*开发img地址*/
    fontPath     : path.resolve(appPath, files.fontName), /*开发font地址*/
    viewPath     : path.resolve(appPath, files.viewName), /*开发视图地址*/
    testPath     : path.resolve(appPath, files.testName), /*测试文件地址*/
    htmlPath     : path.resolve(appPath, files.htmlName), /*视图存放地址*/
    staticPath   : path.resolve(appPath, files.staticName), /*静态文件地址*/
    componentPath: path.resolve(appPath, files.componentName), /*组件地址*/
  });
  
  return files;
})();