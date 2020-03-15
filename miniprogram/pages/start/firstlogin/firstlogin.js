const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    userInfo: {},
  },

  onLoad: function(options) {

  },

  gotaste: function(options) {
    wx.navigateTo({
      url: '../secondlogin/secondlogin',
    })
  },

  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.wxInfo.OPENID)
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        //需要openid
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })
  },
})