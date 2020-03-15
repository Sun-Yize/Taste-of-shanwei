const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({
  data: {
    tname: '',
    number: '',
    college: '',
    phone: '',
    date: []
  },

  bindDateChange: function(e) {
    console.log('picker为', e.detail.value)
    this.setData({
      date: e.detail.value,
    })
  },


  onLoad() {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    }) //获取用户头像昵称
    var self = this;
  },

  formSubmit(e) {
    const value = e.detail.value;
    if (value.tname && value.number && value.college && value.phone && value.date) {
      db.collection('user').doc(wx.getStorageSync('user_id')).update({
        data: {
          tname: value.tname, //真实姓名
        }
      })

      db.collection('user_self').doc(wx.getStorageSync('user_id')).update({
        data: {
          tname: value.tname, //真实姓名
          number: value.number, //学工号
          college: value.college, //学院
          phone: value.phone, //手机号码
          birth: value.date //生日
        },
        success(res) {
          console.log('信息提交成功', res),
            wx.showModal({
              title: '成功提示',
              content: '注册成功，请勿重复提交！',
              showCancel: false,
              success: res => {
                wx.switchTab({
                  url: '../../index/index',
                })
              }
            })
        },
        fail(res) {
          console.log('信息提交失败', res)
          wx.navigateBack();
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  },

  onShow(options) {
    db.collection('user_self').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        if (res.data.tname != undefined) {
          console.log(res.data.tname)
          this.setData({
            tname: res.data.tname,
            phone: res.data.phone,
            number: res.data.number,
            college: res.data.college,
            date: res.data.birth,
          })
        } else {}
      }
    })
  },
})