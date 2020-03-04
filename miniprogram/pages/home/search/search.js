const app = getApp();
const db = wx.cloud.database();
const _ = db.command
let timeId = null;
Page({
  data: {
    history: [],
    hot: [],
    result: [],
    showKeywords: false,
    keywords: [],
    value: '',
    showResult: false,
    restaurant: [
      ['馨园一楼', '馨园二楼', '馨园三楼'],
      ['荟园一楼', '荟园二楼', '0'],
      ['泰园二楼', '泰园三楼', '泰园四楼'],
      ['雀园一楼', '0', '0']
    ]
  },

  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },

  searchInput(e) {
    if (e.detail.value != 0){
    db.collection("restaurant").where({
      restaurant: db.RegExp({
        regexp: e.detail.value,
        options: 'i',
      })}).get({
        success: res => {
          if(res.data==0){
            this.setData({
              showKeywords: true,
              keywords: ['抱歉，未查询到相关内容']
            })
          }else{
            for(var index1 in res.data){
              var temp = "keywords["+ index1 +"]"
              this.setData({
                showKeywords: true,
                [temp]: res.data[index1].restaurant
              })
            }
          }
        }
      })
    }else{
      this.setData({
        showKeywords: false,
        keywords: []
      })
    }
  },

  keywordHandle(e) {
    const text = e.target.dataset.text;
    db.collection('restaurant').where({
      restaurant: e.target.dataset.text
    }).get({
      success: res => {
        this.setData({
          value: text,
          showKeywords: false,
          result: res.data,
          showResult: true
        })
      }
    })
    this.historyHandle(text);
  },

  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop();
      }
    } else {
      history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({
      history
    });
  },

  getIntoStore: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../store/store?id=' + e.target.dataset.item._id,
    })
  },

  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: JSON.parse(history)
      })
      console.log(this.data.history);
    }
    db.collection('user').where({
      _id: wx.getStorageSync('user_id')
    }).get({
      success: res => {
        this.setData({
          hot: res.data[0].taste
        })
      }
    })
  }
})