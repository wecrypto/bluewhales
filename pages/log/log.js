Page({
  onLoad: function () {   　  　　　　
    　wx.login({})  　　
  },
  onShow: function () {
    //延时跳转/加载动画
    setTimeout(function(){
      wx.switchTab({
      url: '/pages/index/index',
      })
    },3500);
 }
})