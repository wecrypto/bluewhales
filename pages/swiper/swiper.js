const app = getApp()
const cloudFileBase = "cloud://fanyi.6661-fanyi-1302120986"
Page({
  data: {
    // 第一次进入的开屏动画
    last_pos: 0,
    swiperImgs: [
      cloudFileBase + "/images/11.png",
      cloudFileBase + "/images/4.png",
      cloudFileBase + "/images/3.png",
    ]
  }
})