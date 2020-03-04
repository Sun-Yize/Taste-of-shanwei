// page/component/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   // urltext:''


  },

  /**
   * 生命周期函数--监听页面加载
   */

  
  onLoad: function (options) {
    //1.发起网络请求
    //let _this=this;
   // wx.request({
      //url: 'https://www.360kuai.com/pc/92693d31ef82809ed?cota=4&kuai_so=1&tj_url=so_rec&sign=360_57c3bbd1&refer_scene=so_1',
     // method:"GET",
     // success:function(res){
        //console.log(res)

     // },
     // fail:function(error){}
   // })

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

/**
 * 下载网络中的文本
 
let that=this;
//wx.downloadFile({
 
  url: 'https://www.360kuai.com/pc/92693d31ef82809ed?cota=4&kuai_so=1&tj_url=so_rec&sign=360_57c3bbd1&refer_scene=so_1',
  header: {},
  success: function(res) {
    console.log(res.data);
    
    
    

  },
  fail: function(error) {},
  complete: function(res) {},
})
 */

