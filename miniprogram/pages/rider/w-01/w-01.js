const app = getApp();
const db = wx.cloud.database();
const _ = db.command
var flag = 0
Page({
  data: {
    bill:0,
    mycredit:100,
    getting:0,
    phone:'',
    mycredit:'',
    tapIndex: '0',     //默认接单
    statusMap: {
      0: '已开工',
      1: '休假中'
    },
    orderlists: [],
    myorders: app.globalData.myorders,
    ordername:[]
  },

  onLoad:function(){
    
  },

  onShow: function () {
    var _this = this
    db.collection('rider')
      .where({
        _id:wx.getStorageSync('user_id')
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
    this.setData({    //每次重新进入页面时订单池重新加载
      orderlists:[],
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getList(true)
  },

  changeStatus: function () {
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

  onReachBottom:function(){        //触底加载
    // this.page += 1
    this.getList(true)
  },

  getList(isInit) {
    var show = []
    var _this = this
    const PAGE = 3                //PAGE后期可改，每次新加载出的订单个数
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order')
      .where({
        condition: 1                   //待接单的订单
      }).where({
        cook:true                   //待接单的订单
      })
      .skip(this.page * PAGE).limit(PAGE).get({
        success: res => {
          this.setData({
            orderlists: res.data
          })
          console.log(this.data)
          wx.hideLoading()
        }
      })
    
  },

  onmyData() {                  //点击头像进入“我的”详情页面
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

  // btnTap(e){
  //   wx.showModal({
  //     title: '提示',
  //     content: '亲，你确定要接单吗？',
  //     success(res) {
  //       console.log(e)
  //       const item = e.currentTarget.dataset.item._id
  //       const i = app.globalData.myorders.findIndex(v => v == item)
  //       if (res.confirm) {
  //         if (i > -1) {
  //           wx.showToast({
  //             title: '您已接单！请在“正在进行”中查看',
  //             icon: 'none',
  //             duration: 1500
  //           })
  //         } else {
  //           app.globalData.myorders.push(item)
  //           console.log(app.globalData.myorders)
  //           // 改变订单状态函数
  //           db.collection('users').where({
  //             _openid: app.globalData.userInfo.openid,
  //           })
  //             .get({
  //               success:res=> {
  //                 console.log("yes", res)
  //                 db.collection('users').doc(res.data[0]._id).update({
  //                   data: {
  //                     state1: db.command.set(app.globalData.myorders)
  //                   },
  //                   success: function (res) {
  //                     console.log("待取货订单上传成功")           //添加到骑手订单列表
  //                   }
  //                 })
  //               }
  //             })
  //           db.collection('orders').doc(item)
  //           .update({
  //             data:{
  //               state:1                           //设置订单状态为待取货
  //             },
  //             success:res=>{
  //               console.log(res)
  //             }
  //           })
  //           wx.showToast({
  //             title: '接单成功',
  //             icon: 'success',
  //             duration: 2000
  //           })
  //         }
  //       }
  //       else if (res.cancel) {
  //         if (i > -1){
  //           wx.showModal({
  //             title: '提示',
  //             content: '亲，取消接单要扣除信用分哦！你确定要取消接单吗？',
  //             success:res=>{
  //               if (res.confirm) {
  //                 //改变订单状态函数
  //                 db.collection('users')
  //                   .where({
  //                     _openid: app.globalData.userInfo.openid,
  //                   })
  //                   .get({
  //                     success: res => {
  //                       db.collection('users').doc(res.data[0]._id).update({
  //                         data: {
  //                           mycredit: db.command.inc(-5)
  //                         },
  //                         success: function (res) {
  //                           console.log("骑手信用分-5")
  //                         }
  //                       })
  //                     }
  //                   }),
  //                 db.collection('users').where({
  //                   _openid: app.globalData.userInfo.openid,
  //                 })
  //                   .get({
  //                     success: res => {
  //                       db.collection('orders').doc(item)
  //                         .update({
  //                           data: {
  //                             state: 0                           //设置订单状态为待接单
  //                           },
  //                           success: res => {
  //                             console.log(res)
  //                           }
  //                   }),
  //                 db.collection('users').doc(res.data[0]._id).update({
  //                   data: {
  //                     state1: db.command.pull(item)
  //                   },
  //                   success: function (res) {
  //                     console.log("待取货订单取消成功")     //从骑手的订单列表里删除
  //                   }
  //                 })
  //               },
  //             }),
  //                 wx.showToast({
  //                   title: '您已取消接单，信用分-5',
  //                   icon: 'none',
  //                   duration: 1500
  //                 })
  //               }
  //               else if (res.cancel){
  //                 wx.showToast({
  //                   title: '请继续完成派单任务哦！',
  //                   icon: 'none',
  //                   duration: 1500
  //                 })
  //               }
  //             }
  //          })
  //         }
  //         else{
  //           wx.showToast({
  //             title: '您已取消接单',
  //             icon: 'none',
  //             duration: 1500
  //           })
  //         }
  //       }
  //     }
  //   })
  // },

  btnTap(e) {
    var _this=this
    wx.showModal({
      title: '提示',
      content: '亲，你确定要接单吗？',
      success(res) {
        if(res.confirm){
          const item = e.currentTarget.dataset.item._id
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
                title: '您已接单！请在“正在进行”中查看',
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

  homeNav:function(e){
    flag = 1
    wx.switchTab({
      url: '../../home/index/index',
    })
  },

  orderNav:function(){
    flag = 1
    wx.switchTab({
      url: '../../home/allorder/allorder',
    })
  },

  mineNav:function(){
    flag = 1
    wx.switchTab({
      url: '../../home/user/main/user',
    })
  },

  onUnload: function () {
    if(flag == 0){
      wx.switchTab({
        url: '../../home/index/index'
      })
    }
  },
})