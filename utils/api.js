import md5 from './md5.min.js'
const appid = '20190315000277554'
const key = 'mvk5xxnlq0AiGxgpBCTw'
const token='success'
//const domain='medicine'
function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate',
      data: {
        q,
        from,
        to,
        appid,
        salt,     
        sign
      },
      success(res) {
          console.log('翻译成功语种'+to);
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          console.log('翻译失败语种'+to);
          console.log('失败错误码'+res.data.error_code);
          console.log("失败原因"+res.data.error_msg);
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail(res) {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate