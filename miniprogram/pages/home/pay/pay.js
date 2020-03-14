const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:[],
    tag:0,
    discount:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var show=[]
    let tmp = JSON.parse(options.order)
    this.setData({
      order: tmp,
      res_id: options.id,
      totalMoney: parseInt(options.totalMoney)+2,
      resname: options.resname,
      image: options.image,
    })
    for(var i = 0;i < this.data.order.length;i++){
      db.collection('dish').doc(this.data.order[i].id).get({
        success:res => {
          console.log(res.data._id)
          for (var m = 0; m < this.data.order.length; m++) {
            if (res.data._id == this.data.order[m].id){
              var obj = Object.assign({ number: this.data.order[m].number }, {per: this.data.order[m].number * res.data.price },res.data);
              show.push(obj)
              this.setData({
                showlist: show,
              })
              // console.log(obj)
            }
          }   
          console.log(this.data.showlist)
        }
      })
    }

    
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
    var _this = this
    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        console.log(res)
        if (res.data.destination == undefined) {
          var o = "address.tname"
          var p = "address.destination"
          this.setData({
            [o]: "暂无配送地址",
            [p]: "点击修改"
          })
        } else {
          this.setData({
            address: res.data
          })
        }
      }
    })
    setTimeout(function(){
      if (_this.data.tag == 1) {
        _this.setData({
          totalMoney: _this.data.totalMoney - 3,
          discount: 3
        })
      } else if (_this.data.tag == 2) {
        _this.setData({
          totalMoney: _this.data.totalMoney - 5,
          discount: 5,
        })
      } else if (_this.data.tag == 3) {
        _this.setData({
          discount: _this.data.totalMoney,
          totalMoney: 0,
        })
      } else { }
    },500)
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

  changeAddress: function(){
    wx.navigateTo({
      url: '../user/address/address',
    })
  },

  gototicket: function(){
    wx.navigateTo({
      url: '../discount/discount?totalMoney=' + this.data.totalMoney + '&tag=' + this.data.tag,
    })
  },

  submitOrder: function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "\t" + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())

    var _this = this
    if(this.data.address.destination == "点击修改"){
      wx.showToast({
        title: '请填写配送信息！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.cloud.callFunction({
        name: 'user_createorder',
        data: {
          user_id: wx.getStorageSync('user_id'),
          res_id: _this.data.res_id,
          user_name: _this.data.address.nickName,
          phone: _this.data.address.phone,
          order: _this.data.order,
          billmoney: _this.data.totalMoney,
          destination: _this.data.address.destination,
          resname: _this.data.resname,
          image: _this.data.image,
          date: String(time),
          tname: _this.data.address.tname,
        },
        success: res => {
          _this.onShow(true)
          wx.showToast({
            title: '提交订单成功',
            icon: 'none',
            duration: 1500
          })
          wx.redirectTo({
            url: '../deliver/deliver?id=' + res.result._id,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交订单失败',
          })
          console.error('[云函数] [sum] 调用失败：', err)
        }
      })
    }
  }
})