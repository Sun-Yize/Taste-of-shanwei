const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ongoing:[],
    allorder:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    db.collection('order').where({
      user_id: wx.getStorageSync('user_id'),
      condition: _.neq(4)
    }).orderBy('date', 'desc').get({
      success: res => {
        this.setData({
          ongoing: res.data
        })
        console.log(this.data)
      }
    })

    db.collection('order').where({
      user_id: wx.getStorageSync('user_id'),
      condition: 4
    }).orderBy('date', 'desc').get({
      success: tmp => {
        this.setData({
          allorder: tmp.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  orderDetail: function(e){
    wx.navigateTo({
      url: '../deliver/deliver?id='+e.target.dataset.id,
    })
  },
  evaluate: function(e){
    wx.navigateTo({
      url: '../eva/eva?id=' + e.target.dataset.id,
    })
  }
})