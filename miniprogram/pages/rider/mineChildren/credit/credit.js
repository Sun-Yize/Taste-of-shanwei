const app = getApp();
const db = wx.cloud.database();

Page({
  data:{
    finishorders:[],       //已完成的有评价的订单
    mycredit:0             //我的信用分
  },

  onShow: function(){
    this.page = 0
    this.setData({    //每次重新进入页面评价重新加载
      finishorders: []
    })
    this.getFinishList(true)
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

  getFinishList(isInit) {
    const PAGE = 3
    wx.showLoading({
      title: '加载中',
    })
    db.collection('rider').where({
      state: 3
    }).skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        if (isInit) {
          this.setData({
            finishorders: this.data.finishorders.concat(res.data)
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