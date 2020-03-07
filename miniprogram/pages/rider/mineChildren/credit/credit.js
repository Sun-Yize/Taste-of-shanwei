const app = getApp();
const db = wx.cloud.database();

Page({
  data:{
    historyorders:[],       //历史订单
    mycredit:0             //我的信用分
  },

  onShow: function(){
    this.page = 0
    this.setData({    //每次重新进入页面评价重新加载
      historyorders: []
    })
    this.gethistoryorders(true)
    db.collection('rider')
      .where({
        _id:wx.getStorageSync('user_id'),
      })
      .get({
        success: res => {
          this.setData({
            mycredit: res.data[0].mycredit
          })
        },
      })
  },

  gethistoryorders(isInit) {
    const PAGE = 3
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order').where({
      condition:4
    }).skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        if (isInit) {
          this.setData({
            historyorders: this.data.historyorders.concat(res.data)
          })
          wx.hideLoading()
        }
      }
    })
  },

  exchange() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/exchange/exchange'
    })
  }

})