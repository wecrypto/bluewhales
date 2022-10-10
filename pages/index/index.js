//获取应用实例

import wxuuid from '../../utils/uuid';
import sha256 from '../../utils/sha256';
const app = getApp();
//引入微信同声传译
const plugin = requirePlugin('WechatSI');
//引入语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
import {
  translate
} from '../../utils/api.js'
var msg, token, IMEI, filePath

  Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar ==='function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0
                })
            }
        }
    },
    properties: {
      //是否显示modal
      show: {
        type: Boolean,
        value: true
      },
      shows:{
        type: Boolean,
        value: true
      },
      //modal的高度
      height: {
        type: String,
        value: '50%'
      }
    },
    data: {
      query: '',
      hideClearIcon: true,
      result: [],
      yiwen:"",
      curLang: {},
      recordState: false, //录音状态
      content: '', //内容
      rest: "",
      filePath: "",
      ok: "",
      book: '',
      rest: "",
      download: "onetap",
      routers: [
        {
            name: 'Camera',
            icon:"iconfont icon-xiangji2",
            tap:'putimg',
            code: '10'
        },
        {
            name: 'DOCX',
            icon: 'iconfont icon-wordwendang',
            tap:'openFileHandle',
            code: '11'
        },
        {
            name: 'DOC',
            icon: 'iconf icon-doc',
            tap:'openDOCHandle',
            code: '10'
        },
        {
            name: 'PDF',
            icon: 'iconf icon-pdf',
            tap:'openPDFHandle',
            code: '11'
        },

         {
            name: 'Voice',
            icon: 'iconfont icon-yuyin',
            start:'touchStart',
            end:'touchEnd',
            code: '11'
        },    
        {
          
            name: 'Contact',
           // tap: "clickMask",
           tap:"tiao" ,
           icon: 'iconfont icon-kaifazhe',
            code: '10'
        },
       
    
    ]
    },
  attached: function () {
    this.videoCtx = wx.createVideoContext('myVideo', this)
  },
  methods: {
    //译文长按复制功能
    fuzhi: function (e) {
      wx.setClipboardData({
        data: this.data.yiwen,
        success (res) {
          wx.getClipboardData({
            success (res) {
              wx.showToast({
                title: '译文已复制',
                duration:1300
              })
            }
          })
        }
      })      
     },  
    develop:function(){
      wx.navigateTo({
        url: '../develop/develop',
      })
    },
    tiao: function(){
      wx.navigateTo({
        url: '../about/about',
      })
   },
   onetap: function() {
     wx.showToast({
       // 提示内容
       title: "请先上传DOCX/DOC/PDF文档！",
       icon: "none",
       duration: 1500,
       mask: false,
     })
   },
   onLoad: function(options) {
     if(wx.getStorageSync("isNotFirstInit")!=true){
        wx.login({})
        wx.setStorageSync("isNotFirstInit", true)
     }
     this.initRecord();
     console.log('lonload..');
     console.log(options);
     if (options.query) {
       this.setData({
         query: options.query
       })
     }
   },
   onShow: function() {
     var that = this;
     if (this.data.curLang.lang !== app.globalData.curLang.lang) {
       this.setData({
         curLang: app.globalData.curLang
       })
       that.onConfirm()
     }
   },
   onInput: function(e) {
     this.setData({
       'query': e.detail.value
     })
     if (this.data.query.length > 0) {
       this.setData({
         'hideClearIcon': false
       })
     } else {
       this.setData({
         'hideClearIcon': true
       })
     }
     console.log('focus')
   },
   onTapClose: function() {
     this.end();
     this.setData({
       query: '',
       hideClearIcon: true,
       result: []
     })
   },
   onConfirm: function() {
     if (!this.data.query) return
     translate(this.data.query, {
       from: 'auto',
       to: this.data.curLang.lang
     }).then(res => {
       this.setData({
         'result': res.trans_result,
         'yiwen':JSON.stringify(res.trans_result[0].dst).replace(/\"/g, "")
       })
       let history = wx.getStorageSync('history') || []
       history.unshift({
         query: this.data.query,
         result: res.trans_result[0].dst
       })
       history.length = history.length > 100 ? 100 : history.length
       wx.setStorageSync('history', history)
     })
   },
 
   initRecord: function() {
     const that = this;
 
     manager.onRecognize = function(res) {
       console.log(res)
     }
 
     manager.onStart = function(res) {
       console.log("成功开始录音识别", res)
     }
 
     manager.onError = function(res) {
       console.error("语音识别错误"+ res);
     }
 
     manager.onStop = function(res) {
       console.log('..............结束录音')
       console.log('录音临时文件地址 -->' + res.tempFilePath);
       console.log('录音总时长 -->' + res.duration + 'ms');
       console.log('文件大小 --> ' + res.fileSize + 'B');
       console.log('语音内容 --> ' + res.result);
       if (res.result == '') {
         wx.showModal({
           title: '提示',
           content: '听不清楚，请重新说一遍！',
           showCancel: false,
           success: function(res) {}
         })
         return;
       }
       var text = that.data.content + res.result;
 
       that.setData({
         query: text
       })
        that.onLoad();
       that.onConfirm();
     }
   },
   touchStart: function(e) {
     this.setData({ recordState: true })
     manager.start({ lang: 'zh_CN' })
   },
   touchEnd: function(e) {
     this.setData({ recordState: false })
     manager.stop();
   },
   truncate(q) {
     const size = q.length;
     return size <= 20 ? q : q.slice(0, 10) + (size + '') + q.slice(size - 10, size)
   },
   downLoadHandle(appKey, secret, flownumber) {
     const that = this;
     setTimeout(() => {
       wx.showLoading({
         title: '正在保存翻译',
       });
     }, 100);
     const salt = wxuuid();
     const curtime = Math.floor(Date.now() / 1000);
     const options = {
       flownumber,
       downloadFileType: 'word',
       appKey,
       sign: sha256(appKey + that.truncate(flownumber) + salt + curtime + secret),
       salt,
       curtime,
       docType: 'json',
       signType: 'v3'
     }
     const downloadUrl = `https://tx4.soutuya.com/word?flownumber=${options.flownumber}&appKey=${options.appKey}&sign=${options.sign}&salt=${options.salt}&curtime=${options.curtime}`;
     wx.downloadFile({
       url: downloadUrl,
       success: function(res) {
         console.log(res);
         var filePath = res.tempFilePath;
         //let data='routers['+4+'].tap';
         that.setData({
           filePath,
            download: "openFile",
          // [data] :"openFile"
         })     
         wx.showToast({
           title: '翻译完成',
         })
         that.openFile(filePath);
       },
       fail: function(res) {
         console.log('文件下载失败');
       }
     })
     
   },
   openFile(e) {
     //const filePath = e.currentTarget.dataset.path;
     const filePath = e;
     wx.openDocument({
       filePath,
       success: function(res) {
         console.log('打开文档成功');
       },
       fail: function(res) {
         console.log(res);
       },
       complete: function(res) {
         console.log(res);
       }
     });
   },
   async showProgress(secret, appKey, flownumber) {
     const that = this;
     const base = "https://openapi.youdao.com/file_trans/query";
     while (true) {
       const salt = wxuuid();
       const curtime = Math.floor(Date.now() / 1000);
       const status = await new Promise(resolve => {
         wx.request({
           url: base,
           method: "POST",
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: {
             flownumber,
             appKey,
             salt,
             curtime,
             docType: 'json',
             signType: 'v3',
             sign: sha256(appKey + that.truncate(flownumber) + salt + curtime + secret),
           },
           success(res) {
             console.log(res);
             wx.showLoading({
               title: res.data.statusString,
               mask: true,
             });
             if (res.data.status > 3) {
               //完成翻译
               that.downLoadHandle(appKey, secret, flownumber)
               resolve({
                 state: 2,
                 msg: 'done'
               });
               return;
             };
             if (res.data.status < 0) {
               resolve({
                 state: 3,
                 msg: "文档类型错误"
               })
             }
             resolve({
               state: 1
             })
           }
         });
       });
       if (status.state === 2) break;
       if (status.state === 3) {
         setTimeout(() => {
           wx.showLoading({
             title: status.msg,
           });
           setTimeout(() => {
             wx.hideLoading();
           }, 1200);
         }, 100);
         break;
       }
     }
     wx.hideLoading();
   },
   openFileHandle() {
     const that = this;
     const secret = 'zBejfTKRRnYyLFEqKWUlkAFpucvzWQkD'
     const appKey = '196be88b4025d69a';
     const curtime = Math.floor(Date.now() / 1000);
     const salt = wxuuid();
     wx.chooseMessageFile({
       count: 1,
       extension: ['pdf', 'doc', 'docx'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
         const ext = name.split('.');
         wx.showLoading({
           title: '上传中',
         });
         setTimeout(function () {
          wx.hideLoading()
        }, 1200)
         wx.request({
           url: 'https://openapi.youdao.com/file_trans/upload',
           method: "POST",
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: {
             q: b64file,
             fileName: name,
             fileType: ext === 'docx' ? 'docx' : 'docx',
             //fileType: 'pdf',
             langFrom: 'zh-CHS',
             langTo: 'en',
             appKey,
             salt,
             curtime,
             sign: sha256(appKey + that.truncate(b64file) + salt + curtime + secret),
             docType: 'json',
             signType: 'v3',
           },
           success(res) {
             const {
               flownumber
             } = res.data;
             that.showProgress(secret, appKey, flownumber);
           }
         });
       }
     })
   },
   openPDFHandle() {
     const that = this;
     const secret = 'zBejfTKRRnYyLFEqKWUlkAFpucvzWQkD'
     const appKey = '196be88b4025d69a';
     const curtime = Math.floor(Date.now() / 1000);
     const salt = wxuuid();
     wx.chooseMessageFile({
       count: 1,
       extension: ['pdf', 'doc', 'docx'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
         const ext = name.split('.');
          wx.showLoading({
           title: '上传中',
         });
         setTimeout(function () {
          wx.hideLoading()
        }, 2000)
         wx.request({
           url: 'https://openapi.youdao.com/file_trans/upload',
           method: "POST",
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: {
             q: b64file,
             fileName: name,
             fileType: ext === 'docx' ? 'docx' : 'pdf',
             //fileType: 'pdf',
             langFrom: 'zh-CHS',
             langTo: 'en',
             appKey,
             salt,
             curtime,
             sign: sha256(appKey + that.truncate(b64file) + salt + curtime + secret),
             docType: 'json',
             signType: 'v3',
           },
           success(res) {
             const {
               flownumber
             } = res.data;
             that.showProgress(secret, appKey, flownumber);
           }
         });
       }
     })
   },
   openDOCHandle() {
     const that = this;
     const secret = 'zBejfTKRRnYyLFEqKWUlkAFpucvzWQkD'
     const appKey = '196be88b4025d69a';
     const curtime = Math.floor(Date.now() / 1000);
     const salt = wxuuid();
     wx.chooseMessageFile({
       count: 1,
       extension: ['pdf', 'doc', 'docx'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
         const ext = name.split('.');
         wx.showLoading({
           title: '上传中',
         });
         setTimeout(function () {
          wx.hideLoading()
        }, 2000)
         wx.request({
           url: 'https://openapi.youdao.com/file_trans/upload',
           method: "POST",
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: {
             q: b64file,
             fileName: name,
             fileType: ext === 'docx' ? 'docx' : 'doc',
             //fileType: 'pdf',
             langFrom: 'zh-CHS',
             langTo: 'en',
             appKey,
             salt,
             curtime,
             sign: sha256(appKey + that.truncate(b64file) + salt + curtime + secret),
             docType: 'json',
             signType: 'v3',
           },
           success(res) {
             const {
               flownumber
             } = res.data;
             that.showProgress(secret, appKey, flownumber);
           }
         });
       }
     })
   },
   putimg: function() {
     // this.setData({ query: '', result: [] })
     const that = this;
     wx.chooseImage({ // 选中图片
       count: 1,
       success: function(res) {
         const tempFilePath = res.tempFilePaths[0]
         const imgBase64 = wx.getFileSystemManager().readFileSync(tempFilePath, "base64") //将图片转为base64（word）
         //获取百度api的access-token
         wx.request({
           url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=qtdMzsu3mp6Ao21UrjyqU4q9&client_secret=MvcTVSfZMHBGszcGyEZD0WssCFKcFR8f',
           header: { 'Content-Type': 'application/x-www-form-urlencoded' },
           success: res => {
             const key = res.data.access_token  //获取access-token
             wx.request({
               url: "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + key,
               method: "POST",
               data: { image: imgBase64, language_type: "JAP" },
               header: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'dataType': 'json'
               },
               success: res => {
                 const { words_result } = res.data
                 var strs = ""
                 for(var i in words_result)strs += words_result[i].words+"。";
                 console.log("图片OCR的文本：" + strs);
                 that.setData({ query: strs })
                 that.onConfirm();
               },
               fail: err => console.log(err)
             })
           },
           fail: err => console.log(err)
         })
       }
     });
   },
   testall: function() {
     //获取百度api的access-token
     let that = this;
     let key = that.data.key;
     wx.request({
       url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=qtdMzsu3mp6Ao21UrjyqU4q9&client_secret=MvcTVSfZMHBGszcGyEZD0WssCFKcFR8f',
       header: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'dataType': 'json'
       },
       success: function(res) {
         that.setData({
           key: res.data.access_token
         })
         //获取access-token赋值为key
       },
       fail: function() {
         console.log(fail)
       }
 
     })
     let word = that.data.word;
     var final = "";
     wx.request({
       url: "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + key,
       method: "POST",
       data: {
         image: word,
         language_type: "JAP"
       },
       header: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'dataType': 'json'
       },
       success: function(res) {
         var str = JSON.stringify(res.data.words_result);
         for (var i in str) {
           var a = str[i];
           if (a != "[" && a != "{" && a != "(" && a != ")" && a != "]" && a != ":" && a != "}" && a != "," && a != '"') {
             final = final.concat(a);
           }
         }
         final = final.split("words");
         final = final.toString().replace(",", " ")
         console.log(final);
         that.setData({
           query: final
         })
       },
     })
     this.setData({
       query: final
     })
     that.onConfirm();
   },
 
   //百度语音识别
   tts: function(e) {
     var grant_type = "client_credentials";
     var appKey = "2XbdzbfD3h2l3M2u6lpkcdmu";
     var appSecret = "gio6nKbYa6XHOuQ2ScMPGlC6kvxzZQIP";
     // var url = "https://openapi.baidu.com/oauth/2.0/token" + "grant_type=" + grant_type + "&client_id=" + appKey + "&client_secret=" + appSecret
     var url = "https://openapi.baidu.com/oauth/2.0/token"
     wx.request({
       url: url,
       data: {
         grant_type: grant_type,
         client_id: appKey,
         client_secret: appSecret
       },
       method: "GET",
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function(res) {
         console.log(res.data);
         token = res.data.access_token
       }
     })
   },
   // 合成
   cancel: function(e) {
     var con = JSON.stringify(this.data.result).replace("src", "");
     con = con.replace("dst", "")
     var final = " ";
     var count = 0;
     for (var i in con) {
       var a = con[i];
       if (a == ':') {
         count++
       }
       if (count == 2) {
         if (a != ']' && a != '}') {
           final = final.concat(a);
         }
       }
     }
     console.log("语音为" + final);
     var tex = encodeURI(final); //转换编码url_encode UTF8编码
     tex = encodeURI(tex);
     var tok = token;
     var cuid = IMEI;
     var ctp = 1;
     var lan = "zh"; // zh表示中文
 
     var spd = 5;
     var url = "https://tsn.baidu.com/text2audio?tex=" + tex + "&lan=" + lan + "&cuid=" + cuid + "&ctp=" + ctp + "&tok=" + tok + "&spd=" + spd
     wx.downloadFile({
       url: url,
       success: function(res) {
         console.log(res)
         filePath = res.tempFilePath;
 
         if (res.statusCode === 200) {
           wx.playVoice({
             filePath: res.tempFilePath
           })
         }
         wx.removeSavedFile({
           filePath: 'res.tempFilePath',
         })
       }
     })
   },
   //播放
   play: function(e) {
     this.tts();
     this.cancel();
     const innerAudioContext = wx.createInnerAudioContext()
     innerAudioContext.autoplay = true
     innerAudioContext.src = filePath
     innerAudioContext.onPlay(() => {
       console.log('开始播放')
     })
     innerAudioContext.onError((res) => {
       console.log(res.errMsg)
       console.log(res.errCode)
     })
   },
   onReady(e) {
     //创建内部 audio 上下文 InnerAudioContext 对象。
     this.innerAudioContext = wx.createInnerAudioContext();
     this.innerAudioContext.onError(function(res) {
       console.log(res);
     })
   },
   // 文字转语音(有效)
   wordYun: function(e) {
     plugin.textToSpeech({
       lang: "zh_CN",
       tts: true,
       content: this.data.yiwen,
       success: function(res) {
         console.log(res);
         console.log("succ tts", res.filename);
         that.setData({
           src: res.filename
         })
         that.yuyinPlay();
       },
       fail: function(res) {
         console.log("fail tts", res)
       }
     })
   },
    //播放语音
   yuyinPlay: function(e) {
     if (this.data.src == '') {
       console.log(暂无语音);
       return;
     }
     this.innerAudioContext.src = this.data.src //设置音频地址
     this.innerAudioContext.play(); //播放音频
   },
   // 结束语音
   end: function(e) {
     this.innerAudioContext.pause(); //暂停音频
   },
   //删除图片
   ImgClose: function() {
     this.setData({
       img: ''
     })
   },
   onShareAppMessage: function () {}, 
        clickMask() {
          this.setData({show: false})
        },
        cancel() {
          this.setData({ show:true,
          shows:true})
          this.triggerEvent('cancel')
          this.videoCtx.pause();
        },
        confirm() {
          this.setData({ show: true,
          shows:true })
          this.triggerEvent('confirm')
          this.videoCtx.pause();
        }
    }
  })