# 常见问题
* `start`启动项目失败
  1. 可能`install`依赖下载失败，导致依赖残缺
  2. 可能配置的环境版本过低，尝试更新一下node.js包
* `install`依赖失败【网络问题】
  1. 首先删除原`node_modules`文件夹的残缺依赖
  2. 尝试使用`cnpm`
  ``` base
  $ npm run cnpm
  $ cnpm install
  ```
* 使用**CSS预处理器**导致启动项目失败
  1. 可能相关依赖未安装
      * 查看主文档，添加相应依赖。
  2. 可能相关依赖安装失败
      * 尝试使用`cnpm` 进行安装   
  3. 可能app文件夹内的样式文件后缀未修改了相应预处理器的后缀。
    * 默认`app/source/css`内的文件后置修改为相应的后缀。
* 引入库，但无法全局调用。
  1. 请在`app/static/index.js`中配置
    * 如`Jquery`
      ``` js
      import jquery from 'jquery';
      window.$ = jquery;
      ```