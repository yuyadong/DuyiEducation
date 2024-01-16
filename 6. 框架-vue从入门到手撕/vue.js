function observe(obj) {
  for (const key in obj) {
    let internalValue = obj[key];
    let funcs = [];
    Object.defineProperty(obj, key, {
      // 依赖收集，记录是哪个函数在用我饿
      get: function () {
        if (window.__func && !funcs.includes(window.__func)) {
          funcs.push(window.__func);
        }
        return internalValue;
      },
      // 派发更新，执行用我的函数
      set: function (val) {
        internalValue = val;
        for (let i = 0; i < funcs.length; i++) {
          funcs[i]();
        }
      },
    });
  }
}

function autorun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}
