// pages/evaluate/evaluate.js
var app = getApp();
const db = wx.cloud.database()
const _ = db.command
var p = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    name: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var i = 0
    var show = []
    db.collection('order').where({
      res_id: wx.getStorageSync('current')
    }).get({
      success: res => {
        while (i < res.data.length) {
          if (res.data[i].evaluate != undefined) {
            var obj = Object.assign({
              neva: 5 - res.data[i].evaluate
            }, res.data[i]);
            show.push(obj)
            this.setData({
              items: show,
            })
          }
          i++;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})