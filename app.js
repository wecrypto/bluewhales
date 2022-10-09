//app.js
App({
  onLaunch: function () {
    this.globalData.curLang = wx.getStorageSync('curLang') || this.globalData.langList[0]
    
    wx.onAppRoute(() => {
      let pages = getCurrentPages();
      let view = pages[pages.length - 1];
      if (view) {
        view.onShareAppMessage = function () {
          return {
            title: '这里有一个好用的翻译小程序，快来试试吧~',
            path: '/pages/blank/blank'
          }
        }
      }
    })

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'fanyi',//环境id
        traceUser: true,
      })
    }
  },
  globalData: {
    curLang: {},
    down: "onetap",
    langList: [
      {
        'chs': '英语',
        "lang": 'en',
        "index": 0
      },
      {
        'chs': '中文',
        'lang': 'zh',
        "index": 1
      },
      {
        'chs': '日语',
        'lang': 'jp',
        "index": 2
      },
      {
        'chs': '韩语',
        'lang': 'kor',
        "index": 3
      },
      {
        'chs': '法语',
        'lang': 'fra',
        "index": 4
      },
      {
        'chs': '西班牙语',
        'lang': 'spa',
        "index": 5
      },
      {
        'chs': '泰语',
        'lang': 'th',
        "index": 7
      },
      {
        'chs': '俄语',
        'lang': 'ru',
        "index": 8
      },
      {
        'chs': '德语',
        'lang': 'de',
        "index": 9
      },
      {
        'chs': '意大利语',
        'lang': 'it',
        "index": 10
      },
      {
        'chs': '葡萄牙语',
        'lang': 'pt',
        "index": 11
      },
      {
        'chs': '希腊语',
        'lang': 'el',
        "index": 12
      },
      {
        'chs': '荷兰语',
        'lang': 'nl',
        "index": 13
      },
      {
        'chs': '波兰语',
        'lang': 'pl',
        "index": 14
      },
      {
        'chs': '保加利亚语',
        'lang': 'bul',
        "index": 15
      },
      {
        'chs': '爱沙尼亚语',
        'lang': 'est',
        "index": 16
      },
      {
        'chs': '丹麦语',
        'lang': 'dan',
        "index": 17
      },
      {
        'chs': '粤语',
        'lang': 'yue',
        "index": 18
      },
      {
        'chs': '文言文',
        'lang': 'wyw',
        "index": 19
      },
      {
        'chs': '芬兰语',
        'lang': 'fin',
        "index": 20
      },
      {
        'chs': '捷克语',
        'lang': 'cs',
        "index": 21
      },
      {
        'chs': '罗马尼亚语',
        'lang': 'rom',
        "index": 22
      },
      {
        'chs': '斯洛文尼亚语',
        'lang': 'slo',
        "index": 23
      },
      {
        'chs': '瑞典语',
        'lang': 'swe',
        "index": 24
      },
      {
        'chs': '匈牙利语',
        'lang': 'hu',
        "index": 25
      },
      {
        'chs': '繁体中文',
        'lang': 'cht',
        "index": 26
      },
      {
        'chs': '越南语',
        'lang': 'vie',
        "index": 27
      },
      {
        'chs': '阿尔巴尼亚语',
        'lang': 'alb',
        "index": 29
      },
      {
        'chs': '阿拉贡语',
        'lang': 'arg',
        "index": 30
      },
      {
        'chs': '艾马拉语',
        'lang': 'aym',
        "index": 31
      },
      {
        'chs': '奥赛梯语',
        'lang': 'oss',
        "index": 32
      },
      {
        'chs': '奥里亚语',
        'lang': 'ori',
        "index": 33
      },
      {
        'chs': '爱尔兰语',
        'lang': 'gle',
        "index": 34
      },
      {
        'chs': '阿尔及利亚语',
        'lang': 'arq',
        "index": 35
      },
      {
        'chs': '阿姆哈拉语',
        'lang': 'amh',
        "index": 36
      },
      {
        'chs': '阿赛拜疆语',
        'lang': 'aze',
        "index": 37
      },
      {
        'chs': '爱沙尼亚语',
        'lang': 'est',
        "index": 38
      },
      {
        'chs': '奥罗莫语',
        'lang': 'orm',
        "index": 39
      },
      {
        'chs': '奥克语',
        'lang': 'oci',
        "index": 40
      },
      {
        'chs': '阿肯语',
        'lang': 'aka',
        "index": 41
      },
      {
        'chs': '阿萨姆语',
        'lang': 'asm',
        "index": 42
      },
      {
        'chs': '阿斯图里亚斯语',
        'lang': 'ast',
        "index": 43
      },
      {
        'chs': '奥杰布瓦语',
        'lang': 'oji',
        "index": 44
      },
      {
        'chs': '波兰语',
        'lang': 'pl',
        "index": 45
      },
      {
        'chs': '巴什基尔语',
        'lang': 'bak',
        "index": 46
      },
      {
        'chs': '白俄罗斯语',
        'lang': 'bel',
        "index": 47
      },
      {
        'chs': '保加利亚语',
        'lang': 'bul',
        "index": 48
      },
      {
        'chs': '本巴语',
        'lang': 'bem',
        "index": 49
      },
      {
        'chs': '俾路支语',
        'lang': 'bal',
        "index": 50
      },
      {
        'chs': '博杰普尔语',
        'lang': 'bho',
        "index": 51
      },
      {
        'chs': '波斯语',
        'lang': 'per',
        "index": 52
      },
      {
        'chs': '巴斯克语',
        'lang': 'baq',
        "index": 53
      },
      {
        'chs': '柏柏尔语',
        'lang': 'ber',
        "index": 54
      },
      {
        'chs': '北方萨米语',
        'lang': 'sme',
        "index": 55
      },
      {
        'chs': '比林语',
        'lang': 'bli',
        "index": 56
      },
      {
        'chs': '冰岛语',
        'lang': 'ice',
        "index": 57
      },
      {
        'chs': '布列塔尼语',
        'lang': 'bre',
        "index": 58
      },
      {
        'chs': '巴西葡萄牙语',
        'lang': 'pot',
        "index": 59
      },
      {
        'chs': '邦板牙语',
        'lang': 'pam',
        "index": 60
      },
      {
        'chs': '北索托语',
        'lang': 'ped',
        "index": 61
      },
      {
        'chs': '比斯拉马语',
        'lang': 'bis',
        "index": 62
      },
      {
        'chs': '波斯尼亚语',
        'lang': 'bos',
        "index": 63
      },
      {
        'chs': '楚瓦什语',
        'lang': 'chv',
        "index": 64
      },
      {
        'chs': '聪加语',
        'lang': 'tso',
        "index": 65
      },
      {
        'chs': '掸语',
        'lang': 'sha',
        "index": 66
      },
      {
        'chs': '低地德语',
        'lang': 'log',
        "index": 67
      },
      {
        'chs': '德顿语',
        'lang': 'tet',
        "index": 68
      },
      {
        'chs': '迪维希语',
        'lang': 'div',
        "index": 69
      },
      {
        'chs': '梵语',
        'lang': 'san',
        "index": 70
      },
      {
        'chs': '法罗语',
        'lang': 'fao',
        "index": 71
      },
      {
        'chs': '菲律宾语',
        'lang': 'fil',
        "index": 72
      },
      {
        'chs': '弗留利语',
        'lang': 'fri',
        "index": 73
      },
      {
        'chs': '富拉尼语',
        'lang': 'ful',
        "index": 74
      },
      {
        'chs': '盖尔语',
        'lang': 'gla',
        "index": 75
      },
      {
        'chs': '高棉语',
        'lang': 'hkm',
        "index": 76
      },
      {
        'chs': '古吉拉特语',
        'lang': 'guj',
        "index": 77
      },
      {
        'chs': '瓜拉尼语',
        'lang': 'grn',
        "index": 78
      },
      {
        'chs': '刚果语',
        'lang': 'kon',
        "index": 79
      },
      {
        'chs': '格陵兰语',
        'lang': 'kal',
        "index": 80
      },
      {
        'chs': '古希腊语',
        'lang': 'gra',
        "index": 81
      },
      {
        'chs': '高地索布语',
        'lang': 'ups',
        "index": 82
      },
      {
        'chs': '格鲁吉亚语',
        'lang': 'geo',
        "index": 83
      },
      {
        'chs': '古英语',
        'lang': 'eno',
        "index": 84
      },
      {
        'chs': '哈卡钦语',
        'lang': 'hak',
        "index": 85
      },
      {
        'chs': '豪萨语',
        'lang': 'hau',
        "index": 86
      },
      {
        'chs': '荷兰语',
        'lang': 'nl',
        "index": 87
      },
      {
        'chs': '哈萨克语',
        'lang': 'kaz',
        "index": 88
      },
      {
        'chs': '黑山语',
        'lang': 'mot',
        "index": 89
      },
      {
        'chs': '胡帕语',
        'lang': 'hup',
        "index": 90
      },
      {
        'chs': '海地语',
        'lang': 'ht',
        "index": 91
      },
      {
        'chs': '吉尔吉斯语',
        'lang': 'kir',
        "index": 92
      },
      {
        'chs': '加泰罗尼亚语',
        'lang': 'cat',
        "index": 93
      },
      {
        'chs': '加利西亚语',
        'lang': 'glg',
        "index": 94
      },
      {
        'chs': '捷克语',
        'lang': 'cs',
        "index": 95
      },
      {
        'chs': '加拿大法语',
        'lang': 'frn',
        "index": 96
      },
      {
        'chs': '卡拜尔语',
        'lang': 'kab',
        "index": 97
      },
      {
        'chs': '卡舒比语',
        'lang': 'kah',
        "index": 98
      },
      {
        'chs': '科西嘉语',
        'lang': 'cos',
        "index": 99
      },
      {
        'chs': '克林贡语',
        'lang': 'kli',
        "index": 100
      },
      {
        'chs': '克什米尔语',
        'lang': 'kas',
        "index": 101
      },
      {
        'chs': '卡纳达语',
        'lang': 'kan',
        "index": 102
      },
      {
        'chs': '康瓦尔语',
        'lang': 'cor',
        "index": 103
      },
      {
        'chs': '克里克语',
        'lang': 'cre',
        "index": 104
      },
      {
        'chs': '克罗地亚语',
        'lang': 'hrv',
        "index": 105
      },
      {
        'chs': '孔卡尼语',
        'lang': 'kok',
        "index": 106
      },
      {
        'chs': '卡努里语',
        'lang': 'kau',
        "index": 107
      },
      {
        'chs': '科萨语',
        'lang': 'xho',
        "index": 108
      },
      {
        'chs': '克丘亚语',
        'lang': 'que',
        "index": 109
      },
      {
        'chs': '库尔德语',
        'lang': 'kur',
        "index": 110
      },
      {
        'chs': '拉丁语',
        'lang': 'lat',
        "index": 111
      },
      {
        'chs': '拉特加莱语',
        'lang': 'lag',
        "index": 112
      },
      {
        'chs': '林加拉语',
        'lang': 'lin',
        "index": 113
      },
      {
        'chs': '卢森尼亚语',
        'lang': 'ruy',
        "index": 114
      },
      {
        'chs': '罗曼什语',
        'lang': 'roh',
        "index": 115
      },
      {
        'chs': '老挝语',
        'lang': 'lao',
        "index": 116
      },
      {
        'chs': '拉脱维亚语',
        'lang': 'lav',
        "index": 117
      },
      {
        'chs': '卢干达语',
        'lang': 'lug',
        "index": 118
      },
      {
        'chs': '卢旺达语',
        'lang': 'kin',
        "index": 119
      },
      {
        'chs': '罗姆语',
        'lang': 'ro',
        "index": 120
      },
      {
        'chs': '罗马尼亚语',
        'lang': 'rom',
        "index": 121
      },
      {
        'chs': '林堡语',
        'lang': 'lim',
        "index": 122
      },
      {
        'chs': '卢森堡语',
        'lang': 'ltz',
        "index": 123
      },
      {
        'chs': '立陶宛语',
        'lang': 'lit',
        "index": 124
      },
      {
        'chs': '逻辑语',
        'lang': 'loj',
        "index": 125
      },
      {
        'chs': '库尔德语',
        'lang': 'kur',
        "index": 110
      },
      {
        'chs': '马来语',
        'lang': 'may',
        "index": 111
      },
      {
        'chs': '马拉加斯语',
        'lang': 'mg',
        "index": 112
      },
      {
        'chs': '马绍尔语',
        'lang': 'mah',
        "index": 113
      },
      {
        'chs': '毛里求斯克里奥尔语',
        'lang': 'mau',
        "index": 114
      },
      {
        'chs': '马耳他语',
        'lang': 'mlt',
        "index": 115
      },
      {
        'chs': '缅甸语',
        'lang': 'bur',
        "index": 116
      },
      {
        'chs': '马拉雅拉姆语',
        'lang': 'mal',
        "index": 117
      },
      {
        'chs': '迈蒂利语',
        'lang': 'mai',
        "index": 118
      },
      {
        'chs': '毛利语',
        'lang': 'mao',
        "index": 119
      },
      {
        'chs': '蒙古语',
        'lang': 'mon',
        "index": 120
      },
      {
        'chs': '马拉地语',
        'lang': 'mar',
        "index": 121
      },
      {
        'chs': '马其顿语',
        'lang': 'mac',
        "index": 122
      },
      {
        'chs': '曼克斯语',
        'lang': 'glv',
        "index": 123
      },
      {
        'chs': '孟加拉语',
        'lang': 'ben',
        "index": 124
      },
      {
        'chs': '挪威语',
        'lang': 'nor',
        "index": 125
      },
      {
        'chs': '南非荷兰语',
        'lang': 'afr',
        "index": 126
      },
      {
        'chs': '那不勒斯语',
        'lang': 'nea',
        "index": 127
      },
      {
        'chs': '南索托语',
        'lang': 'sot',
        "index": 128
      },
      {
        'chs': '旁遮普语',
        'lang': 'pan',
        "index": 129
      },
      {
        'chs': '南恩德贝莱语',
        'lang': 'nbl',
        "index": 130
      },
      {
        'chs': '尼泊尔语',
        'lang': 'nep',
        "index": 131
      },
      {
        'chs': '帕皮阿门托语',
        'lang': 'pap',
        "index": 132
      },
      {
        'chs': '齐切瓦语',
        'lang': 'nya',
        "index": 133
      },
      {
        'chs': '契维语',
        'lang': 'twi',
        "index": 134
      },
      {
        'chs': '切罗基语',
        'lang': 'chr',
        "index": 135
      },
      {
        'chs': '瑞典语',
        'lang': 'swe',
        "index": 136
      },
      {
        'chs': '萨丁尼亚语',
        'lang': 'srd',
        "index": 137
      },
      {
        'chs': '塞尔维亚语',
        'lang': 'srp',
        "index": 138
      },
      {
        'chs': '世界语',
        'lang': 'epo',
        "index": 139
      },
      {
        'chs': '斯洛文尼亚语',
        'lang': 'slo',
        "index": 140
      },
      {
        'chs': '索马里语',
        'lang': 'som',
        "index": 141
      },
      {
        'chs': '萨摩亚语',
        'lang': 'sm',
        "index": 142
      },
      {
        'chs': '桑海语',
        'lang': 'sol',
        "index": 143
      },
      {
        'chs': '书面挪威语',
        'lang': 'nob',
        "index": 144
      },
      {
        'chs': '斯瓦希里语',
        'lang': 'swa',
        "index": 145
      },
      {
        'chs': '僧伽罗语',
        'lang': 'sin',
        "index": 146
      },
      {
        'chs': '斯洛伐克语',
        'lang': 'sk',
        "index": 147
      },
      {
        'chs': '苏格兰语',
        'lang': 'sco',
        "index": 148
      },
      {
        'chs': '泰米尔语',
        'lang': 'tam',
        "index": 149
      },
      {
        'chs': '泰卢固语',
        'lang': 'tel',
        "index": 150
      },
      {
        'chs': '土耳其语',
        'lang': 'tuk',
        "index": 151
      },
      {
        'chs': '他加禄语',
        'lang': 'tgl',
        "index": 152
      },
      {
        'chs': '突尼斯阿拉伯语',
        'lang': 'tua',
        "index": 153
      },
    
      {
        'chs': '塔吉克语',
        'lang': 'tgk',
        "index": 154
      },
      {
        'chs': '捉格利尼亚语',
        'lang': 'tir',
        "index": 155
      },
      {
        'chs': '土库曼语',
        'lang': 'tuk',
        "index": 156
      },
      {
        'chs': '乌克兰语',
        'lang': 'ukr',
        "index": 157
      },
      {
        'chs': '文达语',
        'lang': 'ven',
        "index": 158
      },
      {
        'chs': '乌兹别克语',
        'lang': 'uzb',
        "index": 159
      },
      {
        'chs': '瓦隆语',
        'lang': 'wln',
        "index": 160
      },
      {
        'chs': '沃洛夫语',
        'lang': 'wol',
        "index": 161
      },
      {
        'chs': '维吾尔语',
        'lang': 'uig',
        "index": 162
      },
      {
        'chs': '威尔士语',
        'lang': 'wel',
        "index": 163
      },
      {
        'chs': '乌尔都语',
        'lang': 'urd',
        "index": 164
      },
      {
        'chs': '匈牙利语',
        'lang': 'hu',
        "index": 165
      },
      {
        'chs': '希利盖农语',
        'lang': 'hil',
        "index": 166
      },
      {
        'chs': '新挪威语',
        'lang': 'nno',
        "index": 167
      },
      {
        'chs': '修纳语',
        'lang': 'sna',
        "index": 168
      },
      {
        'chs': '希伯来语',
        'lang': 'heb',
        "index": 169
      },
      {
        'chs': '西弗里斯语',
        'lang': 'fry',
        "index": 170
      },
      {
        'chs': '下索布语',
        'lang': 'los',
        "index": 171
      },
      {
        'chs': '西非书面语语',
        'lang': 'nqo',
        "index": 172
      },
      {
        'chs': '宿务语',
        'lang': 'ceb',
        "index": 173
      },
      {
        'chs': '西里西亚语',
        'lang': 'sil',
        "index": 174
      },
      {
        'chs': '夏威夷语',
        'lang': 'haw',
        "index": 175
      },
      {
        'chs': '信德语',
        'lang': 'snd',
        "index": 176
      },
      {
        'chs': '叙利亚语',
        'lang': 'syr',
        "index": 177
      },
      {
        'chs': '因特语',
        'lang': 'ina',
        "index": 178
      },
      {
        'chs': '伊博语',
        'lang': 'ibo',
        "index": 179
      },
      {
        'chs': '亚美尼亚语',
        'lang': 'arm',
        "index": 180
      },
      {
        'chs': '印地语',
        'lang': 'hi',
        "index": 181
      },
      {
        'chs': '亚齐语',
        'lang': 'ach',
        "index": 182
      },
      {
        'chs': '伊多语',
        'lang': 'ido',
        "index": 183
      },
      {
        'chs': '伊努克捉图特语',
        'lang': 'iku',
        "index": 184
      },
      {
        'chs': '印尼语',
        'lang': 'id',
        "index": 185
      },
      {
        'chs': '意地绪语',
        'lang': 'yid',
        "index": 186
      },
      {
        'chs': '印古什语',
        'lang': 'ing',
        "index": 187
      },
      {
        'chs': '约鲁巴语',
        'lang': 'yor',
        "index": 188
      },
      {
        'chs': '扎扎其语',
        'lang': 'zaz',
        "index": 189
      },
      {
        'chs': '祖鲁语',
        'lang': 'zul',
        "index": 190
      },
      {
        'chs': '爪哇语',
        'lang': 'jav',
        "index": 191
      },
      {
        'chs': '藏语',
        'lang': 'tib',
        "index": 192
      }

    ]
  }
})