// pages/eva/eva.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: ' 亲，来评价下【店铺名称】的用餐体验吧，可以从菜品口味、包装和送餐时间等方面描述哦~',
    num: 4, //后端给的分数，显示的星星
    one_1: '', //点亮的星星数
    two_1: '', //没有点亮的星星数
    one_2: 5, //点亮的星星数
    two_2: 0 //没有点亮的星星数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order_id: options.id,
      one_1: this.data.num,
      two_1: 5 - this.data.num
    })
  },

  in_xin: function(e) {
    var in_xin = e.currentTarget.dataset.in;
    console.log(e.currentTarget.dataset.in);
    console.log(e.currentTarget);
    var one_2;
    if (in_xin == 'star') {
      one_2 = Number(e.currentTarget.id)
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
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
  textFocus: function() {
    this.setData({
      start: ''
    })
  },
  textInput: function(e) {
    this.setData({
      evaluatedetail: e.detail.value
    })
  },
  textBlur: function() {
    this.setData({
      start: '亲，来评价下【店铺名称】的用餐体验吧，可以从菜品口味、包装和送餐时间等方面描述哦~'
    })
  },
  btnSubmit: function() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "\t" + date.getHours() + ":" + date.getMinutes()

    wx.cloud.callFunction({
      name: 'user_evaluate',
      data: {
        id: this.data.order_id,
        evaluatedetail: this.data.evaluatedetail,
        evaluate: this.data.one_2,
        etime:String(time),
      },
      success: res => {
        wx.showToast({
          title: '发布成功',
          icon: 'none',
          duration: 1500
        })
        wx.navigateTo({
          url: '../allorder/allorder',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发布失败，请重试',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }

    })
  }
})