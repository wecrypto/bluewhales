Page({
  onLoad() {
    var isNotFirstInit = wx.getStorageSync("isNotFirstInit");
    if (isNotFirstInit) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.setStorageSync("isNotFirstInit", true)
      wx.redirectTo({
        url: '../log/log'
      })
    }
  }
})