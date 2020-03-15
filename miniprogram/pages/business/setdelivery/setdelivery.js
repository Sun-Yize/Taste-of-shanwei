// pages/business/setdelivery/setdelivery.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: "",
    id: 1,
    temp: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      delivery: options.delivery,
      id: options.id
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

  },

  onbindinput: function(e) {
    this.setData({
      temp: e.detail.value
    })
  },

  onbindtap: function(e) {
    var h = this.data.temp
    var id = this.data.id
    db.collection('restaurant').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        delivery: h
      },
      success: function(res) {
        let pages = getCurrentPages();
        let minePage = pages[pages.length - 2]
        minePage.setData({
            delivery: h
          }),
          wx.navigateBack({
            delta: 1
          })
      }
    })
  },

  onback: function(e) {
    wx.navigateBack({
      delta: 1
    })
  }

})