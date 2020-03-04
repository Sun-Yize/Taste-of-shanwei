const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    condition: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order_id: options.id,
    })
    console.log(this.data)
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
    db.collection('order').where({
      _id: this.data.order_id
    }).get({
      success: res => {
        this.setData({
          order: res.data
        })
        if (res.data[0].cook == false) {
          this.setData({
            condition: '等待商家接单'
          })
        } else if (res.data[0].condition == 2) {
          this.setData({
            condition: '骑手正在赶往商家'
          })
        } else if (res.data[0].condition == 3) {
          this.setData({
            condition: '骑手正在配送中'
          })
        } else if (res.data[0].condition == 4) {
          this.setData({
            condition: '订单已完成'
          })
        }else{
          this.setData({
            condition: '商家正在准备商品'
          })
        }
      }
    })
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

  }
})