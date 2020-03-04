const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    nickname:'',
    number:'',
  },

  onShow: function () {
    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        this.setData({
          tname: res.data.tname,
        })
      }
    })
    db.collection('user_self').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        this.setData({
          number: res.data.number
        })
      }
    })
  },

  
  ticketRule() {
    wx.navigateTo({
      url: '/pages/rider/ticketRule/ticketRule'
    })
  },

  onchangeSetting() {
    wx.navigateTo({
      url: '/pages/rider/setting/setting'
    })
  }
  
})