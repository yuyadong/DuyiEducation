// 单件商品的数据
class UIGoods {
  constructor(g) {
    this.data = g;
    this.choose = 0;
  }
  // 获取单个商品总价
  getTotalPrice() {
    return this.data.price * this.choose;
  }
  // 是否选中此件商品
  isChoose() {
    return this.choose > 0;
  }
  // 选择的数量+1
  increase() {
    this.choose++;
  }
  //   选择的数量-1
  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--;
  }
}
// 界面逻辑
class UIData {
  constructor() {
    let uiGoods = [];
    for (let i = 0; i < goods.length; i++) {
      let uig = new UIGoods(goods[i]);
      uiGoods.push(uig);
    }
    this.uiGoods = uiGoods;
    // 起送费
    this.deliveryThreshold = 30;
    // 配送费
    this.deliveryPrice = 5;
  }
  // 所有商品总价
  getTotalPrice() {
    let sum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      let g = this.uiGoods[i];
      sum += g.getTotalPrice();
    }
    return sum;
  }
  // 增加某件商品选中数量
  increase(index) {
    this.uiGoods[index].increase();
  }
  // 减少某件商品选中数量
  decrease(index) {
    this.uiGoods[index].decrease();
  }
  // 得到总共的选择数量
  getTotalChooseNumber() {
    let sum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      sum += this.uiGoods[i].choose;
    }
    return sum;
  }
  // 购物称重有没有东西
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }
  // 是否跨过了配送标准
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }
  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

// 界面
class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      deliveryPrice: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      totalPrice: document.querySelector(".footer-car-total"),
      car: document.querySelector(".footer-car"),
      badge: document.querySelector(".footer-car-badge"),
    };
    this.createHTML();
    this.updateFooter();
  }
  // 根据商品数据创建商品列表元素
  createHTML() {
    let html = "";
    for (let i = 0; i < this.uiData.uiGoods.length; i++) {
      let g = this.uiData.uiGoods[i];
      html += `<div class="goods-item">
        <img src=${g.data.pic} alt="" class="goods-pic" />
        <div class="goods-info">
          <h2 class="goods-title">${g.data.title}</h2>
          <p class="goods-desc">${g.data.desc}
          </p>
          <p class="goods-sell">
            <span>月售 ${g.data.sellNumber}</span>
            <span>好评率${g.data.favorRate}%</span>
          </p>
          <div class="goods-confirm">
            <p class="goods-price">
              <span class="goods-price-unit">￥</span>
              <span>${g.data.price}</span>
            </p>
            <div class="goods-btns">
              <i class="iconfont i-jianhao"></i>
              <span>${g.choose}</span>
              <i class="iconfont i-jiajianzujianjiahao"></i>
            </div>
          </div>
        </div>
      </div>`;
    }
    this.doms.goodsContainer.innerHTML = html;
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter(index);
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter(index);
  }

  // 更新每个商品元素的显示状态
  updateGoodsItem(index) {
    var goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }
    var span = goodsDom.querySelector(".goods-btns span");
    span.textContent = this.uiData.uiGoods[index].choose;
  }

  // 更新页脚数据状态
  updateFooter(index) {
    // 总价
    let total = this.uiData.getTotalPrice();
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    if (this.uiData.isCrossDeliveryThreshold()) {
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");
      // 还差多少钱
      let dis = this.uiData.deliveryThreshold - total;
      dis = Math.round(dis);
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
    }
    // 设置总价
    this.doms.totalPrice.textContent = total.toFixed(2);
    // 设置购物车样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.car.classList.add("active");
    } else {
      this.doms.car.classList.remove("active");
    }
    // 设置购物车中数量
    this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
  }
}

let ui = new UI();
