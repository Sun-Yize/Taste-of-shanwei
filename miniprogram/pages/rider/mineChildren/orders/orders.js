const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    clientHeight: '',
    ordersContent1: [], //待取货订单
    ordersContent2: [], //待送达订单
    res1: [], //餐馆头像名称缓存
    res2: [], //餐馆头像名称缓存
    currentTab: 0,
    orderrule: [{
        title: "待取货"
      },
      {
        title: "待送达"
      }
    ]
  },

  onShow: function() {
    var clientHeight = ''
    wx.getSystemInfo({
      success: res => {
        clientHeight = res.windowHeight
      }
    })
    this.setData({
      clientHeight: clientHeight
    })
    this.getordersContent1()
    this.getordersContent2()
  },

  //得到待取货订单的函数
  getordersContent1() {
    var res1 = []
    var ordersContent1 = []
    db.collection('order').where({
      rid_id: wx.getStorageSync("user_id"),
      condition: 2
    }).get({
      success: ress => {
        this.setData({
          ordersContent1: ress.data
        })
        console.log(ress.data.res_id)
      },
      fail(res) {
        console.log("no", ress)
      }
    })
  },

  //得到待送达订单的函数
  getordersContent2() {
    var res2 = []
    var ordersContent2 = []
    db.collection('order').where({
      rid_id: wx.getStorageSync("user_id"),
      condition: 3
    }).get({
      success: res => {
        this.setData({
          ordersContent2: res.data
        })
      },
      fail(res) {
        console.log("no", res)
      }
    })
  },

  switchNav: function(e) {
    console.log(e.currentTarget.dataset.current)
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
    this.getordersContent1() //每次切换Tab时更新数据
    this.getordersContent2()
  },

  // 滚动切换标签样式 
  switchTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  deleteItem(item, fileList) {
    // 先遍历list里面的每一个元素，对比item与每个元素的id是否相等，再利用splice的方法删除
    for (var key in fileList) {
      if (fileList[key]._id === item) {
        fileList.splice(key, 1)
      }
    }
    return fileList
  },

  btnTap1: function(e) {
    var _this = this
    const item = e.currentTarget.dataset.item._id
    // console.log(app.globalData.myorders)
    wx.showModal({
      title: '提示',
      content: '亲，你确定取货吗？',
      success: res => {
        if (res.confirm) {
          console.log(_this.data.ordersContent1)
          var ordersContent1 = _this.data.ordersContent1
          ordersContent1 = _this.deleteItem(item, _this.data.ordersContent1)
          console.log(ordersContent1)
          _this.setData({
            ordersContent1: ordersContent1
          })
          wx.cloud.callFunction({
            name: 'rider_send',
            data: {
              id: item,
            },
            success: res => {
              console.log(res)
              _this.onShow(true)
              wx.showToast({
                title: '取货成功！请在“待送达”中查看',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
    })
  },

  btnTap2: function(e) {
    var _this = this
    const item = e.currentTarget.dataset.item._id
    // console.log(app.globalData.myorders)
    wx.showModal({
      title: '提示',
      content: '亲，你确定已送达吗？',
      success: res => {
        if (res.confirm) {
          console.log(_this.data.ordersContent2)
          var ordersContent2 = _this.data.ordersContent2
          ordersContent2 = _this.deleteItem(item, _this.data.ordersContent2)
          console.log(ordersContent2)
          _this.setData({
            ordersContent2: ordersContent2
          })
          wx.cloud.callFunction({
            name: 'rider_complete',
            data: {
              id: item,
            },
            success: res => {
              console.log(res)
              _this.onShow(true)
              wx.showToast({
                title: '恭喜，订单完成！',
                icon: 'none',
                duration: 1500
              })
            }
          })

        }
        let tmp = wx.getStorageSync('user_id')
        db.collection('rider').doc(tmp).update({
          data: {
            mycredit: db.command.inc(5),
            getting: db.command.inc(1)
          }
        })
      }
    })
  }


})