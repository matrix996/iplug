// pages/account-cart/account-cart.js
Page({
    data:{
      cartList:{},
      totalPrice:0,
      selectAllStatus:false
    },
    setCartListData(cartList){
      this.setData({cartList});
      wx.setStorageSync("cartList",cartList);
      this.setTotalPrice();
    },
    //监听页面显示
    onShow:function(){
      let cartList = wx.getStorageSync('cartList')|| {};
      const selectAllStatus = Object.values(cartList).every(item=>item.selected);
      this.setData({
        cartList,
        selectAllStatus,
      });
      this.setTotalPrice();
    },
    //增减计算
    countHandle(event){
      const{id,num}=event.currentTarget.dataset;
      let { cartList }= this.data;
      cartList[id].count+=num;
      if(cartList[id].count<1){
        wx.showModal({
          title:'是否删去当前商品',
          confirmText:"删去",
          confirmColor:"#eb4450",
          success:res=>{
            if(res.confirm){
              delete cartList[id];
            }else if(res.cancel){
              cartList[id].count = 1;
            }
            this.setCartListData(cartList)
          },
        })
      }else{
        this.setCartListData(cartList);
      }
    },
    countBlur(event) {
      let { value } = event.detail;
      const { id } = event.currentTarget.dataset;
      const { cartList } = this.data; 
      cartList[id].count = +value; 
      this.setCartListData(cartList);
      },
      setTotalPrice() {
        const { cartList } = this.data;
        let totalPrice = 0;
        // 遍历本地存储对象value值
        Object.values(cartList).forEach(item => {
        // 选中状态商品
        if (item.selected) {
        totalPrice += item.goods_price * item.count;
        }
        }); 
        this.setData({ totalPrice, })
        }, 
        changeItemSelect(event) { 
          const { id } = event.currentTarget.dataset;
          const { cartList } = this.data; 
          cartList[id].selected = !cartList[id].selected;
          // 遍历购物车集合,全选才为 true
          const selectAllStatus = Object.values(cartList).every(item => item.selected);
          this.setData({ selectAllStatus }); 
          this.setCartListData(cartList);
          },
          changeAllSelect() { 
          let { cartList, selectAllStatus } = this.data;
          selectAllStatus = !selectAllStatus;
          // 遍历购物车数据，更新选中状态
          Object.keys(cartList).forEach(id => {
          cartList[id].selected = selectAllStatus;
          }); 
          this.setData({ selectAllStatus }); 
          this.setCartListData(cartList);
          },
})