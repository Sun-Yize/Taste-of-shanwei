var app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    clientHeight: '',
    currentTab: 0,
    good: [],
    bad: [],
    userInfo: {},
    kind: [{
        title: "好评"
      },
      {
        title: "中差评"
      }
    ]
  },

  onLoad: function() {
    var good = []
    var bad = []
    db.collection('order')
      .where({
        evaluate: 5,
      })
      .get({
        success: (res) => {
          console.log("好评订单：", res)
          this.setData({
            good: res.data,
          })
        }
      }),
      db.collection('order')
      .where({
        evaluate: db.command.neq(5),
      }).where({
        evaluate: db.command.neq(null),
      })
      .get({
        success: (res) => {
          console.log("中差评订单：", res.data)
          this.setData({
            bad: res.data,
          })
          console.log(this.data)
        }
      })
  },

  onShow: function(e) {
    var clientHeight = ''
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        clientHeight = res.windowHeight - 180
      }
    })
    this.setData({
      clientHeight: clientHeight
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
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
  },

  // 滚动切换标签样式 
  switchTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  myrank() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/myrank/myrank'
    })
  },

  mycredit() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/credit/credit'
    })
  },

  billDetail() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/billDetail/billDetail'
    })
  }
})