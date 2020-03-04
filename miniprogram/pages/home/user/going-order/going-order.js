const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    steps: [
      {
        text: '步骤一',
        desc: '您已下单'
      },
      {
        text: '步骤二',
        desc: '商家已接单'
      },
      {
        text: '步骤三',
        desc: '待取货'
      },
      {
        text: '步骤四',
        desc: '配送中'
      }, {
        text: '步骤五',
        desc: '配送完成'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('order').where({
      user_id: wx.getStorageSync('user_id'),
    }).get({
      success: res => {
        this.setData({
          order: res.data[res.data.length - 1]
        })
        if (res.data[res.data.length-1].cook == false) {
          this.setData({
            active:0,
          })
        } else if (res.data[res.data.length - 1].cook == true && res.data[res.data.length - 1].condition == 1) {
          this.setData({
            active: 1,
          })
        } else if (res.data[res.data.length - 1].condition == 2) {
          this.setData({
            active: 2,
          })
        } else if (res.data[res.data.length - 1].condition == 3) {
          this.setData({
            active: 3,
          })
        } else {
          this.setData({
            active: 4,
          })
        }
      }    
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})