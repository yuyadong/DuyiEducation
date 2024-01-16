var aGoods = {
  pic: ".",
  title: "..",
  desc: "...",
  sellNumber: 1,
  favorRate: 2,
  price: 3,
};

class UICoods {
  get totalPrice() {
    return this.choose * this.data.price;
  }

  get isChoose() {
    return this.choose > 0;
  }

  constructor(g) {
    g = { ...g };
    Object.freeze(g);
    var internalChooseValue = 0;
    Object.defineProperty(this, "data", {
      get: function () {
        return g;
      },
      set: function () {
        throw new Error("data是只读的不能重新赋值");
      },
      configurable: false,
    });
    Object.defineProperty(this, "choose", {
      get: function () {
        return internalChooseValue;
      },
      set: function (val) {
        if (typeof val !== "number") {
          throw new Error("chooses属性必须是数字");
        }
        var temp = ~~val;

        if (temp !== val) {
          throw new Error("chooses属性必须是整数");
        }
        if (val < 0) {
          throw new Error("chooses属性必须大于等于0");
        }
        internalChooseValue = val;
      },
      configurable: false,
    });
    this.a = 1;
    Object.seal(this);
  }
}

Object.freeze(UICoods.prototype);

var g = new UICoods(aGoods);
g.choose = 2;
console.log(g.totalPrice);
console.log(g.isChoose);
g.data.price = 100;
console.log(g.data.price);
g.abc = 123;
console.log(g);
g.a = 123;
console.log(g.a);
