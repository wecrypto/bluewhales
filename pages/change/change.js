//change.js
const util = require('../../utils/util.js')
const pinyin = require("../../utils/pinyin.js")
const app = getApp()
Page({
  data: {
    curLang: {},
    oHeight:'',
    langList: []
  },
  onLoad(){
    wx.getSystemInfo({ success: res => this.setData({ oHeight: res.windowHeight }) })
    this.process();
  },
  onShow: function () {
    this.setData({ curLang: app.globalData.curLang })
  },
  onTapItem: function (e) {
    let langObj = e.currentTarget.dataset
    wx.setStorageSync('language', langObj)
    this.setData({ 'curLang': langObj })
    app.globalData.curLang = langObj
    wx.switchTab({ url: '/pages/index/index' })
  },
  process() {
    let langList = [],i = 0
    // 分组
    app.globalData.langList.forEach((item, index) => {
      let capital = pinyin.ChineseToPinYin(item.chs).substr(0, 1)
      let isExists = langList.some(ite => ite.sign == capital)
      if (!isExists) { // 判断当前语言的首字母缩写是否已存在
        langList.push({ id: i++, sign: capital, sublist: [item] })
      } else {
        for (let s in langList) if (capital == langList[s].sign) langList[s].sublist.push(item)
      }
    })
    // 排序
    langList.sort((a, b) => a.sign.charCodeAt() - b.sign.charCodeAt())
    this.setData({ langList: langList })
  },
  chooseLetter(e) {
    let currentItem = e.currentTarget.dataset.item
    this.data.langList.forEach(item => {
      if (item.sign == currentItem.sign) {
        this.setData({
          toView: 'inToView' + currentItem.id //滚动条to指定view
        })
      }
    })
  }
})

