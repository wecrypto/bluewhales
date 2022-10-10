const app = getApp()
const cloudFileBase = "cloud://fanyi.6661-fanyi-1302120986"
Page({
  data: {
    // 第一次进入的开屏动画
    images: cloudFileBase + "/images/top.jpg"
  },
  handlePan:function(e){
    console.log("触发跳转");
    wx.switchTab({
      url: '../index/index',
    })
  }
})