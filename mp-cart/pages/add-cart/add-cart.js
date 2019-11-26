// pages/add-cart/add-cart.js
Page({
  data:{
    goods_all:{},
    },
    onLoad: function (options) {
    //const { goods_id } = options;
    wx.request({
    url: 'https://api.zbztb.cn/api/public/v1/goods/detail',
    data:{ goods_id:9832 },
    success:res=>{
    let mes = res.data.message; 
    let { goods_price }=mes;
    if(typeof goods_price === 'number' && parseInt(goods_price) === goods_price){
    mes.goods_price = goods_price.toFixed(2)
    }
    this.setData({ goods_all: mes }); 
    console.log(this.data.goods_all); 
    }, 
    }); 
    },
    addToCart() {
    const {
    goods_id,
    goods_small_logo,
    goods_name,
    goods_price
    }= this.data.goods_all; 
    let cartList = wx.getStorageSync('cartList') || {};
    // 判断本地存储的数据中是否包含当前商品，数量 +1
    if (cartList[goods_id]) {
    cartList[goods_id].count++;
    }else {
    // 如果当前商品从来没有添加过才创建新对象
    let goodsItem = {
    goods_id,
    goods_small_logo,
    goods_name,
    goods_price,
    selected: true,
    count: 1
    };
    // 把 goods_id 作为键名称存放购物车总商品关键信息
    cartList[goods_id] = goodsItem;
    }
    // 调用写入本地存储的方法
    wx.setStorageSync('cartList', cartList);
    // 给用户提示添加成功，修改提示的时间，防止用户快速点击添加蒙版层
    wx.showToast({
    title: '添加成功',
    duration: 500,
    mask: true
    });
    },
    
})