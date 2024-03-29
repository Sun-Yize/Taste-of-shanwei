const app = getApp();
const db = wx.cloud.database();
const _ = db.command
var flag = 0
Page({
  data: {
    bill: 0,
    mycredit: 100,
    getting: 0,
    phone: '',
    mycredit: '',
    tapIndex: '0', //默认接单
    statusMap: {
      0: '已开工',
      1: '休假中'
    },
    orderlists: [],
    ordername: []
  },

  onLoad: function() {

  },

  onPullDownRefresh: function () {
    this.onShow(true)
    wx.stopPullDownRefresh();
  },

  onShow: function() {
    var _this = this
    db.collection('rider')
      .where({
        _id: wx.getStorageSync('user_id')
      })
      .get({
        success: res => {
          _this.setData({
            phone: res.data[0].phone,
            mycredit: res.data[0].mycredit,
            bill: res.data[0].bill,
            getting: res.data[0].getting,
          })
        }
      })

    this.page = 0
    this.setData({ //每次重新进入页面时订单池重新加载
      orderlists: [],
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getList(true)
  },

  changeStatus: function() {
    var that = this;
    var tapIndex = that.data.tapIndex;
    wx.showActionSheet({
      itemList: ['开工', '收工'],
      success: res1 => {
        that.setData({
          tapIndex: res1.tapIndex
        })
      }
    })
  },

  onReachBottom: function() { //触底加载
    this.page += 1
    this.getList(true)
  },

  getList(isInit) {
    var show = []
    var _this = this
    const PAGE = 3 //PAGE后期可改，每次新加载出的订单个数
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order')
      .where({
        condition: 1 //待接单的订单
      }).where({
        cook: true //待接单的订单
      })
      .skip(this.page * PAGE).limit(PAGE).get({
        success: res => {
          this.setData({
            orderlists: this.data.orderlists.concat(res.data)
          })
          console.log(this.data)
          wx.hideLoading()
        }
      })

  },

  onmyData() { //点击头像进入“我的”详情页面
    wx.navigateTo({
      url: '/pages/rider/myData/myData'
    })
  },

  myWallet() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/myWallet/myWallet'
    })
  },

  billDetail() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/billDetail/billDetail'
    })
  },

  mying() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/orders/orders'
    })
  },

  myEvaluate() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/myEvaluate/myEvaluate'
    })
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

  btnTap(e) {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '亲，你确定要接单吗？',
      success(res) {
        if (res.confirm) {
          const item = e.currentTarget.dataset.item._id
          console.log(_this.data.orderlists)
          var orderlists = _this.data.orderlists
          orderlists = _this.deleteItem(item, _this.data.orderlists)
          console.log(orderlists)
          _this.setData({
            orderlists: orderlists
          })
          wx.cloud.callFunction({
            name: 'rider_getting',
            data: {
              id: item,
              rid_id: wx.getStorageSync('user_id')
            },
            success: res => {
              console.log(res)
              _this.onShow(true)
              wx.showToast({
                title: '接单成功！请在“正在进行”中查看',
                icon: 'none',
                duration: 1500
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '接单失败',
              })
            }
          })
        }
      }
    })
  },

  homeNav: function(e) {
    flag = 1
    wx.switchTab({
      url: '../../home/index/index',
    })
  },

  orderNav: function() {
    flag = 1
    wx.switchTab({
      url: '../../home/allorder/allorder',
    })
  },

  mineNav: function() {
    flag = 1
    wx.switchTab({
      url: '../../home/user/main/user',
    })
  },

  onUnload: function() {
    if (flag == 0) {
      wx.switchTab({
        url: '../../home/index/index'
      })
    }
  },
})