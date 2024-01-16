var obj = {
  a: 1,
  b: 2,
};

// 获取属性描述
var desc = Object.getOwnPropertyDescriptor(obj, "a");
console.log(desc);

// 设置属性描述
Object.defineProperty(obj, "a", {
  value: 10,
  // 不能重写
  writable: false,
  // 不能遍历
  enumerable: false,
  // 不可修改描述符本身
  configurable: false,
});

for (var key in obj) {
  console.log(key);
}

var keys = Object.keys(obj);
console.log(keys);
