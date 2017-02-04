# Common

## 说明

文件地址：[`app/static/index.js`](/app/static/index.js)
为提前声明全局变量为后续脚本调用。

```js
import jquery from 'jquery';
window.$ = jquery;
```

随后就可以直接使用 `$` 而不需要引入jquery

