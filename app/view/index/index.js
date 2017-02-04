console.log('index.js:引入成功');
import 'avalon2';

let vm = avalon.define({
  $id  : "test",
  name : "司徒正美",
  array: [11, 22, 33]
});

setTimeout(function () {
  vm.array.set(0, 444)
}, 3000);

console.log('测试全局Jquery是否正确引用',$('div'));