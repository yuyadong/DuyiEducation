var obj = {};

var internalValue = undefined;

Object.defineProperty(obj, "a", {
  // 读取器
  get: function () {
    return 123;
  },
  // 设置其
  set: function (val) {
    throw new Error("兄弟，这个属性不能复制，你在考虑考虑");
  },
});

obj.a = 123;
console.log(obj.a);
