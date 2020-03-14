const db = wx.cloud.database();
const _ = db.command;
const restaurantCollection = db.collection('restaurant');
var app = getApp();



Page({
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    curIndex:0,
    tasks: [],//初始数据
    restaurantlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var show = []
    var _this = this
    db.collection('user').where({
      _id: wx.getStorageSync('user_id')
    }).get({
      success: res => {
        for(var i=0;i< res.data[0].star.length;i++){
          db.collection('restaurant').where({
            _id: res.data[0].star[i]
          }).get({
            success:tmp => {
              show.push(tmp.data)
              _this.setData({
                restaurantlist:show,
              })
            }
          })
        }
      }
    })
  },


  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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

  },

  getIntoStore: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../../store/store?id=' + e.target.dataset.item._id,
    })
  }

})

