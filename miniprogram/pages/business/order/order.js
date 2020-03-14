// pages/find/find.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: true,
    show2: true,
    show3: true,
    show4: true,
    change: 0,
    buttons: [{
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '待接单'
      },
      {
        id: 2,
        name: '已接单'
      },
      {
        id: 3,
        name: '配送中'
      },
      {
        id: 4,
        name: '已送达'
      },
    ],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: [],
    restaurant: [
      ['馨园一楼', '馨园二楼', '馨园三楼'],
      ['荟园一楼', '荟园二楼', '0'],
      ['泰园二楼', '泰园三楼', '泰园四楼'],
      ['雀园一楼', '0', '0']
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    db.collection('restaurant').where({
      _id: wx.getStorageSync('current')
    }).get({
      success: res => {
        this.setData({
          start: this.data.restaurant[res.data[0].place1][res.data[0].place2],
          resname: res.data[0].restaurant,
          image: res.data[0].image,
        })
        console.log(this.data)
      }
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
    var order = []
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    });
    //查询待接单信息
    db.collection('order')
      .where({
        cook: false,
        res_id: wx.getStorageSync('current')
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList1: order,

            }),
            order = []
        }
      }),
      //查询已接单信息
      db.collection('order')
      .where(_.or([
        {
          cook:true,
          condition:1,
          res_id: wx.getStorageSync('current')
        },
        {
          condition: 2,
        }
      ]))
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList2: order,

            }),
            order = []
            console.log(this.data)
        }
      }),
      //查询配送中信息
      db.collection('order')
      .where({
        condition:3,
        res_id: wx.getStorageSync('current'),
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList3: order,

            }),
            order = []
        }
      }),
      //查询已送达信息
      db.collection('order')
      .where({
        condition: 4,
        res_id: wx.getStorageSync('current'),
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList4: order,

            }),
            order = []
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
    wx.showToast({
      title: '正在刷新数据...',
      icon: 'loading',
      // duration: 2000
    });
    var order = []
    var openid = wx.getStorageSync('userInfo').openid
    console.log(openid)
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    });
    //查询待接单信息
    db.collection('order')
      .where({
        cook: false,
        res_id: wx.getStorageSync('current')
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList1: order,

            }),
            order = []
        }
      }),
      //查询已接单信息
      db.collection('order')
      .where(_.or([
        {
          cook: true,
          condition: 1,
          res_id: wx.getStorageSync('current')
        },
        {
          condition: 2,
        }
      ]))
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList2: order,

            }),
            order = []
        }
      }),
      //查询配送中信息
      db.collection('order')
      .where({
        condition: 3,
        res_id: wx.getStorageSync('current'),
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList3: order,

            }),
            order = []
        }
      }),
      //查询已送达信息
      db.collection('order')
      .where({
        condition: 4,
        res_id: wx.getStorageSync('current'),
      })
      .get({
        //如果查询成功的话
        success: (res) => {
          console.log("查询订单信息成功", res)
          //将获得的数据集加入到原来的数据集中
          for (var i = 0; i < res.data.length; i++) {
            order.push(res.data[i])
          }
          console.log("order:", order)
          this.setData({

              orderList4: order,

            }),
            order = []
        }
      })
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

  // 添加单选监听方法

  radioButtonTap: function(e) {
    console.log("输出", e)
    var id = e.currentTarget.dataset.id
    console.log("按钮id:", id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      } else {
        //其他的位置为false
        this.data.buttons[i].checked = false;

      }
    }
    // 点击按钮传递id,根据id显示或隐藏不同state的订单列,id=0即"全部"按钮
    switch (id) {
      case 0:
        this.setData({
          show1: true,
          show2: true,
          show3: true,
          show4: true
        })
        break;
      case 1:
        this.setData({
          show1: true,
          show2: false,
          show3: false,
          show4: false
        })
        break;
      case 2:
        this.setData({
          show1: false,
          show2: true,
          show3: false,
          show4: false
        })
        break;
      case 3:
        this.setData({
          show1: false,
          show2: false,
          show3: true,
          show4: false
        })
        break;
      case 4:
        this.setData({
          show1: false,
          show2: false,
          show3: false,
          show4: true
        })
        break;
    }
    // console.log(this.data.hidden1, this.data.hidden2, this.data.hidden3, this.data.hidden4)
    this.setData({
      buttons: this.data.buttons,
      msg: "id:" + id
    })
  },


  //接单按钮
  receiveOrder: function(event) {
    const item=event.currentTarget.id
    wx.cloud.callFunction({
      name: 'res_get',
      data: {
        id: item,
        start: this.data.start,
        resname: this.data.resname,
        image: this.data.image,
      }
    })
  },
  //打电话按钮
  makeCall: function() {
    wx.makePhoneCall({
      phoneNumber: '178XXXX5031',
      success: function(res) {
        console.log("yesCall:", res)
      },
      fail: function(res) {
        console.log("noCall:", res)
      },
      complete: function(res) {
        console.log("overCall:", res)
      },
    })
  }


})