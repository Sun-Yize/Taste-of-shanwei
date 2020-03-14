const app = getApp();
const db = wx.cloud.database();
// 得到今日日期的js文件，用于筛选今日订单
import { formatTime } from '../../utils/util'

Page({
  data: {
    clientHeight: '',
    todaydate: '',
    ordersContent1: [],    //今日订单
    ordersContent2: [],   //全部订单
    currentTab: 0,
    orderrule: [
      {
        title: "今日"
      },
      {
        title: "全部"
      }
    ]
  },

  onShow: function () {
    var clientHeight = ''
    wx.getSystemInfo({
      success: res => {
        clientHeight = res.windowHeight
      }
    })
    this.setData({
      clientHeight: clientHeight
    })
    let date = formatTime(new Date())
    var todaydate = ''
    todaydate = date
    this.setData({
      todaydate: todaydate
    })
    console.log(todaydate)   //得到今日日期
    this.getordersContent1()
    this.getordersContent2()
  },


//得到今日订单
  getordersContent1(){
    var ordersContent1 = []
    db.collection('order')
      .where({
        rid_id: wx.getStorageSync('user_id'),
        condition:4,
        date: db.RegExp({
          regexp: this.data.todaydate
        })
      })
      .get({
        success: (res) => {
          console.log("今日订单：", res)
          for (var i = 0; i < res.data.length; i++) {
            ordersContent1.push(res.data[i])
          }
          this.setData({
            ordersContent1: ordersContent1,
          })
        }
      })
  },


  getordersContent2() {
    var ordersContent2 = []
    db.collection('order')
    .where({
      rid_id: wx.getStorageSync('user_id'),                 //全部已完成订单
      condition: 4
    })            
      .get({
        success: (res) => {
          console.log("全部订单：", res)
          for (var i = 0; i < res.data.length; i++) {
            ordersContent2.push(res.data[i])
          }
          this.setData({
            ordersContent2: ordersContent2,
          })
        }
      })
  },


  switchNav: function (e) {
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
    this.getordersContent1() 
    this.getordersContent2() 
  },

  // 滚动切换标签样式 
  switchTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  }

})