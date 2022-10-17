//获取应用实例
import wxuuid from '../../utils/uuid';
import sha256 from '../../utils/sha256';
//语音识别结果
var voice='';
//语音文件大小
var filesize=900000;
//获取全局变量
var app = getApp(); 
//引入百度appkey
const appkey = '2aZeUG2q76ndZukXNoG4AthCm8IjuY8v'
//引入百度secretkey
const secretkey = 'IklbL2Sv6obqYOrACNBWovKVrVNdTcVi'
//引入微信录音
const manager = wx.getRecorderManager();
//文档下载地址
var docPath='';
//文档后缀
var ext =[];
import {
  translate
} from '../../utils/api.js'
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
      query: '',//原文
      hideClearIcon: true,
      result: [],
      translation:"",//译文
      curLang: {},//目标语言
      recordState: false, //录音状态
      content: '', //内容
      filePath: '',
      isCopy:'',
      showmodel:true,
      routers: [
        {
          name: 'PDF',
          icon: 'iconfont icon-pdf',
          tap:'openPDFHandle',
          code: '11'
        },
        {
            name: 'Word',
            icon: 'iconfont icon-wordwendang',
            tap:'openFileHandle',
            code: '11'
        },
        {
            name: 'PPT',
            icon: 'ppt icon-ppt',
            tap:'openPPTHandle',
            code: '10'
        },
        {
            name: 'Camera',
            icon:"iconfont icon-xiangji",
            tap:'chooseImage',
            code: '10'
          
        },
     
         {
           
            name: 'Voice',
            icon: 'iconfont icon-yuyin',
            tap:'touchEnd',
            start:'touchStart',
            end:'touchEnd',
            code: '11'
        },    
        {
          
            name: 'Contact',
            tap:"toAbout" ,
            icon: 'iconfont icon-kaifazhe',
            code: '10'
        },
    ]
    },
  methods: {
    //译文长按复制功能
    copyTranslation: function (e) {
      wx.setClipboardData({
        data: this.data.translation,
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
   //原文长按复制功能
   copyQuery: function (e) {
    wx.setClipboardData({
      data: this.data.query,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '原文已复制',
              duration:1300
            })
          }
        })
      }
    })      
   },  
  hideMask:function(){
   this.setData({
     showmodel:false
   })
    },
  //定向到about页面
    toAbout: function(){
      wx.navigateTo({
        url: '../about/about',
      })
   },
   //加载内容
   onLoad: function(options) {
     if(wx.getStorageSync("isNotFirstInit")!=true){
        wx.login({})
        wx.setStorageSync("isNotFirstInit", true)
     }
     this.initRecord();
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
   //文本输入
   onInput: function(e) {
     this.setData({
       'query': e.detail.value
     })
     if (this.data.query.length > 0) {
       this.setData({
         'hideClearIcon': false
       })
       this.onConfirm();
     } else {
       this.setData({
         'hideClearIcon': true
       })
     }
     console.log('focus')
   },
   //判断query是否为空
   isQueryNull(){
    if(this.data.query)
    {
      this.onConfirm(); 
    }
    else{
      this.onTapClose();
    }
   },
   //一键清空
   onTapClose: function() {
     this.setData({
       query: '',
       isCopy:'',
       hideClearIcon: true,
       result: []
     })
   },
   //文本翻译
   onConfirm: function() {
     if (!this.data.query) return
     translate(this.data.query, {
       from: 'auto',
       to: this.data.curLang.lang
     }).then(res => {
       this.setData({
         'result': res.trans_result,
         'isCopy':'copy',
         'translation':JSON.stringify(res.trans_result[0].dst).replace(/\"/g, "")
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
 //语音识别
   initRecord: function(e) {
     const that = this;
     manager.onRecognize=function (res) {
       console.log('当前语音识别结果'+res.result);
     }
     manager.onStart ((res) =>{
       console.log("成功开始录音识别", res);
     })
     manager.onError ((res)=> {
       console.error("语音识别错误"+ res.msg);
     })
     manager.onFrameRecorded((res) => {
      const { frameBuffer } = res;
    })
     manager.onStop ((res) =>{
       let tempFilePath =res.tempFilePath;
       filesize=res.fileSize;
       console.log("filesize为"+filesize);
       console.log('结束录音') 
       //base64对音频文件加密
       let temp = wx.getFileSystemManager().readFileSync(tempFilePath, "base64");
       //此处引入百度短语音识别方法
       wx.request({
        url:'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+appkey+'&client_secret='+secretkey,
        success(res){
          let token =res.data.access_token;
          console.log("toKen是"+token);
          wx.request({
            url: 'https://vop.baidu.com/server_api',
            method: "POST",
           header: {
             "Content-Type": "application/json"
           },
            data:{
              format:'wav',
              rate:16000,
              channel:1,
              dev_pid:1537,
              cuid:'baidu',
              token:token,
              speech:temp,
              len:filesize
            },
            success(res){ 
              voice= String(res.data.result);
              console.log('语音内容为'+voice);
              if (voice == '') {
                wx.showModal({
                  title: '提示',
                  content: '听不清楚，请重新说一遍！',
                  showCancel: false,
                })
              }
              that.setData({
                query: voice=== 'undefined' ? '未识别成功，请长按底部麦克风图标进行语音输入' : voice,
              })
              console.log("赋值到query的语音为"+that.data.query);
              that.onConfirm(); 
            }
          })
        }
      })         
     })
   },
  //语音开始录制
   touchStart: function(e) {
    const options = {
      duration: 60000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'wav',
      frameSize: 50
    }
     this.setData({ recordState: true })
    manager.start(options); 
   },
   //语音录制结束
   touchEnd: function(e) {
     this.setData({ recordState: false })
     manager.stop();
   },
   //分页
   truncate(q) {
     if(q){
      var size=q.length;   
      var res= size <= 20 ? q : q.slice(0, 10) + (size + '') + q.slice(size - 10, size)
     }
    return res;
   },
  //下载翻译文档
   downLoadHandle(appKey, secret, flownumber) {
     console.log("开始调用文档下载接口");
     const that = this;
     const salt = wxuuid();
     const curtime = Math.floor(Date.now() / 1000);
     const options = {
       flownumber,
       downloadFileType: 'docx',
       appKey,
       sign: sha256(appKey + that.truncate(flownumber) + salt + curtime + secret),
       salt,
       curtime,
       docType: 'json',
       signType: 'v3'
     }
     const downloadUrl = `https://openapi.youdao.com/file_trans/download?flownumber=${options.flownumber}&downloadFileType=${options.downloadFileType}&appKey=${options.appKey}&sign=${options.sign}&salt=${options.salt}&curtime=${options.curtime}&docType=${options.docType}&signType=${options.signType}`;
     console.log("有道文档下载地址是"+downloadUrl);
     wx.downloadFile({
       url: downloadUrl,
       success: function(res) {
         docPath =res.tempFilePath;
         console.log("翻译后文档的地址为--》"+docPath);
        //预览文件
         wx.openDocument({
          filePath: docPath,
          fileType: 'docx',
          success: function(res) {
            console.log('打开文档成功');
          },
          fail: function(res) {
            console.log("失败原因是"+res.toString());
          },
          complete: function(res) {
            console.log(res);
          }
        })
       },
       fail: function(res) {
         console.log('文件下载失败');
       }
     })
   },
   //翻译进度
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
              console.log("准备调用文档下载接口");
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
       extension: ['doc', 'docx'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
var ext = name.split('.');
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
             fileType: ext==='docx'?'docx':'doc',
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
       extension: ['pdf'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
          var ext = name.split('.');
          console.log("ext的值为"+ext);
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
             fileType: ext==='pdf'?'pdf':'pdf',
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
   openPPTHandle() {
     const that = this;
     const secret = 'zBejfTKRRnYyLFEqKWUlkAFpucvzWQkD'
     const appKey = '196be88b4025d69a';
     const curtime = Math.floor(Date.now() / 1000);
     const salt = wxuuid();
     wx.chooseMessageFile({
       count: 1,
       extension: ['pptx','ppt'],
       type: 'file',
       success(res) {
         const {
           path,
           name
         } = res.tempFiles[0];
         const b64file = wx.getFileSystemManager().readFileSync(path, "base64");
         var ext = name.split('.');
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
             fileType: ext==='pptx'?'pptx':'pptx',
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
   //图片选择
   chooseImage: function() {
     const that = this;
     wx.chooseImage({ // 选中图片
       count: 1,
       success: function(res) {
         const tempFilePath = res.tempFilePaths[0]
         const imgBase64 = wx.getFileSystemManager().readFileSync(tempFilePath, "base64") 
         //将图片转为base64（word）
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
   //百度token获取
   gettoken: function(e) {
     var grant_type = "client_credentials";
     var appKey = "2XbdzbfD3h2l3M2u6lpkcdmu";
     var appSecret = "gio6nKbYa6XHOuQ2ScMPGlC6kvxzZQIP";
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
   onReady(e) {
   },
    }
  })