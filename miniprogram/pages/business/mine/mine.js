// pages/mine/mine.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var p = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    taste:[],
    restaurant: '',
    place1: 0,
    place2: 0,
    image: '',
    notice: '',
    on: false,
    multiArray: [
      ['馨园', '荟园', '泰园', '雀园'],
      ['一楼', '二楼', '三楼']
    ],
  },
  bindViewTap: function() {
    wx.navigateto({
      url: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function() {
    var temp = wx.getStorageSync('userInfo')
    var _this=this
    //查询商家个人信息
    db.collection('restaurant_self')
      .where({
        _openid: _.eq('userInfo.openid'),
      })
      .get().then(res => {
        //未有记录，则增加初始空白记录
        if (res.data == 0) {
          console.log("未有该商家openid记录,正在添加空白记录中", res.data)
          db.collection("restaurant_self").add({
            data: {
              _openid: _.eq('userInfo.openid'),
              nickName: temp.nickName,
              avatarUrl: temp.avatarUrl,
              openid: temp.openid,
            },
            success:function(res){
              wx.setStorageSync('current', res._id)
              console.log(temp.avatarUrl)
              db.collection("restaurant").add({
                data: {
                  _id: res._id,
                  name: '',
                  phone: '',
                  restaurant: '',
                  delivery:'',
                  place1: 1,
                  place2: 1,
                  image: '',
                  notice: '',
                  on: false,
                  taste:[],
                },
                success: function (res) {
                  console.log("添加空白记录成功", res)
                },
                fail(res) {
                  console.log("添加空白记录失败", res)
                }
              })
            }
          })
        }
        //已有此openid记录，则查询记录
        else {
          console.log("查询商家信息成功", res)
          db.collection('restaurant').where({
            _id: res.data[0]._id
          }).get({
            success:function(res){
              console.log(res.data[0]._id)
              _this.setData({
                id: res.data[0]._id,
                name: res.data[0].name,
                phone: res.data[0].phone,
                restaurant: res.data[0].restaurant,
                place1: res.data[0].place1,
                place2: res.data[0].place2,
                delivery:res.data[0].delivery,
                multiIndex: [res.data[0].place1, res.data[0].place2],
                image: res.data[0].image,
                notice: res.data[0].notice,
                on: res.data[0].on,
                taste:res.data[0].taste
              })
              wx.setStorageSync('current', res.data[0]._id)
            }
          }) 
          
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      hasUserInfo: true
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


  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.wxInfo.OPENID)
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        //需要openid
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })
  },

  //编写营业状态函数
  onbindchange: function(e) {
    db.collection('restaurant').where({
        _openid: 'userInfo.openid',
      })
      .get({
        success(res) {
          console.log("yes", res.data[0]._id)
          db.collection('restaurant').doc(res.data[0]._id).update({
            data: {
              on: db.command.set(e.detail.value)
            },
            success: function(res) {
              this.setData({
                on: e.detail.value
              })
            }
          })
        },
        fail(res) {
          console.log("no", res)
        }
      })
  },

  //接受预定函数
  onbindbook: function(e) {
    db.collection('restaurant')
      .where({
        _openid: 'userInfo.openid',
        //done: false
      })
      .get({
        success(res) {
          console.log("yes", res.data[0]._id)
          db.collection('restaurant').doc(res.data[0]._id).update({
            data: {
              book: db.command.set(e.detail.value)
            },
            success: function(res) {
              this.setData({
                book: e.detail.value
              })
            }
          })
        },
        fail(res) {
          console.log("no", res.data[0]._id)
        }
      })
  },
  //更改店铺位置
  bindMultiPickerChange: function(e) {
    var id = this.data.id
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        multiIndex: e.detail.value
      }),
      db.collection('restaurant').doc(id).update({
        data: {
          place1: e.detail.value[0],
          place2: e.detail.value[1],
        }
      })
  },
  bindMultiPickerColumnChange: function(e) {
    // var id = this.data.id
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    if (e.detail.column == 0) { //第1列
      if (e.detail.value == 0) { //馨园
        this.setData({
          multiArray: [
            ['馨园', '荟园', '泰园', '雀园'],
            ['一楼', '二楼', '三楼']
          ]
        })
      };
      if (e.detail.value == 1) { //荟园
        this.setData({
          multiArray: [
            ['馨园', '荟园', '泰园', '雀园'],
            ['一楼', '二楼']
          ]
        })
      };
      if (e.detail.value == 2) { //泰园
        this.setData({
          multiArray: [
            ['馨园', '荟园', '泰园', '雀园'],
            ['二楼', '三楼', '四楼']
          ]
        })
      };
      if (e.detail.value == 3) { //雀园
        this.setData({
          multiArray: [
            ['馨园', '荟园', '泰园', '雀园'],
            ['一楼']
          ]
        })
      };
    };

  },
  getout: function() {
    this.setData({
      hasUserInfo: false
    })
    wx.navigateTo({
      url: '../../start/firstlogin/firstlogin',
    })
  },
  gotoShow: function() {
    var _this = this
    var id = this.data.id
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // success
        console.log(res.tempFilePaths)
        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = "my-image-" + tempFile[tempFile.length - 2]
        _this.setData({
            image: res.tempFilePaths,
            getimage: true
          }),
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log(res.fileID)

            }
          }),
          db.collection('restaurant').where({
            _id: wx.getStorageSync('current')
            //done: false
          }).update({
            data: {
              image: res.tempFilePaths[0]
            }
          })
      }
    })
  }
  // getPhoneNumber: function(e) {
  //   console.log(e);
  //   wx.callFunction({
  //     name: 'getphone',
  //     data: {
  //       cloudID: e.detail.cloudID
  //     }
  //   }).then(res => {
  //     this.setData({
  //       phone: res.result
  //     })
  //   }).catch(err => {
  //     console.log("error")
  //   })
  // }
})