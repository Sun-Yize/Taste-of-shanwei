const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytickets: {
      "ticket1": 0,
      "ticket2": 0,
      "ticket3": 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      totalMoney: options.totalMoney,
      tag: options.tag,
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
    db.collection('rider').where({
      _id: wx.getStorageSync('user_id')
    }).get({
      success: res => {

        this.setData({
          mytickets: res.data[0].mytickets
        })
        console.log(this.data)
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

  },

  useticket1: function() {
    if (this.data.mytickets.ticket1 > 0 && this.data.tag == 0) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var temp = "mytickets.ticket1"
      this.setData({
        [temp]: this.data.mytickets.ticket1 - 1
      })
      console.log(this.data)

      db.collection('rider').doc(wx.getStorageSync('user_id')).update({
        data: {
          mytickets: this.data.mytickets
        }
      })
      wx.showToast({
        title: '使用成功！',
        icon: 'success',
        duration: 2000
      })
      prevPage.setData({
        tag: 1,
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: '使用失败！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  useticket2: function() {
    if (this.data.mytickets.ticket2 > 0 && this.data.tag == 0) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var temp = "mytickets.ticket2"
      this.setData({
        [temp]: this.data.mytickets.ticket2 - 1
      })
      console.log(this.data)

      db.collection('rider').doc(wx.getStorageSync('user_id')).update({
        data: {
          mytickets: this.data.mytickets
        }
      })

      wx.showToast({
        title: '使用成功！',
        icon: 'success',
        duration: 2000
      })
      prevPage.setData({
        tag: 2,
      })
      wx.navigateBack({
        delta: 1
      })

    } else {
      wx.showToast({
        title: '使用失败！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  useticket3: function() {
    if (this.data.mytickets.ticket3 > 0 && this.data.totalMoney <= 15 && this.data.tag == 0) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var temp = "mytickets.ticket3"
      this.setData({
        [temp]: this.data.mytickets.ticket3 - 1
      })
      console.log(this.data)

      db.collection('rider').doc(wx.getStorageSync('user_id')).update({
        data: {
          mytickets: this.data.mytickets
        }
      })

      wx.showToast({
        title: '使用成功！',
        icon: 'success',
        duration: 2000
      })

      prevPage.setData({
        tag: 3,
      })
      wx.navigateBack({
        delta: 1
      })

    } else {
      wx.showToast({
        title: '使用失败！',
        icon: 'none',
        duration: 2000
      })
    }
  },
})