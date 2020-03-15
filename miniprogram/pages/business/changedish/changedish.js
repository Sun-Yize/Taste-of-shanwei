const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    price: 0,
    name: '',
    introduce: '',
    tag: '',
    getimage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      src: options.src,
      tag: options.tag,
      id: options.id,
      name: options.name,
      introduce: options.introduce,
      price: options.price
    })
  },

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

  gotoShow: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // success
        console.log(res)
        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = "my-image-" + tempFile[tempFile.length - 2]
        _this.setData({
          src: res.tempFilePaths,
          getimage: true
        })

        wx.getFileSystemManager().readFile({
          filePath: filePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            wx.cloud.callFunction({
              name: 'res_resimg',
              data: {
                path: wx.getStorageSync('current') + '/' + Date.parse(new Date()) + '.png',
                file: res.data
              },
              success: _res => {
                console.log(_res.result.fileID)
                _this.setData({
                  src_temp: _res.result.fileID
                })
              }
            })
          }
        })
      }
    })
  },

  preview: function(e) {

    wx.previewImage({

      urls: this.data.src
    })
  },

  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  price: function(e) {
    let m = parseFloat(e.detail.value)
    this.setData({
      price: m
    })

  },

  tag: function(e) {
    this.setData({
      tag: e.detail.value
    })
  },

  introduce: function(e) {
    this.setData({
      introduce: e.detail.value
    })
  },

  //上传按钮
  changeData: function(e) {
    var id = this.data.id
    console.log(id)
    db.collection('dish').doc(id).update({
      data: {
        res_id: wx.getStorageSync('current'),
        src: this.data.src_temp,
        price: this.data.price,
        name: this.data.name,
        tag: this.data.tag,
        introduce: this.data.introduce
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '更改成功',
        })
      },
      fail: err => {
        console.log(err);
      }
    })
    wx.navigateBack({
      delta: 1
    })
  },

  onbindchange: function(e) {
    console.log(e)
    this.setData({
      notsell: e.detail.value
    })
  },

  delete: function(e) {
    var id = this.data.id
    db.collection('dish').doc(id).remove({
      success: function(res) {
        console.log(res.data)
      }
    })
    wx.navigateBack({
      delta: 1
    })
  }
  
})