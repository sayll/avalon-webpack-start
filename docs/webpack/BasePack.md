# 基础打包

## 说明

方式一：

```bash
$ npm run dll       # 生成所需的dll文件
$ npm run build     # 打包剩余的相关文件
```

方式二：

```bash
$ npm run start     # 运行开发模式（次模式自动打包dll文件）
$ npm run build     # 打包剩余的相关文件
```

## 重点

当之前的依赖文件 `webpack.dll.js` 添加了新的依赖时，需重新运行 `start` or `dll`;