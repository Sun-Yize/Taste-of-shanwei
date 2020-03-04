const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
  },

  onShow: function(){
    db.collection('rider')
      .where({
        _id:wx.getStorageSync('user_id')
      })
      .get().then(res => {
        //未有记录，则增加初始空白记录
        if (res.data == 0) {
          console.log("未有该骑手openid记录")
        }
        //已有此openid记录，则查询记录
        else {
          wx.redirectTo({
            url: '../w-01/w-01',
          })
        }
      })
  },

  updateStatu: function (e) {
    console.log(e.currentTarget.dataset.value);
    const value = e.currentTarget.dataset.value;
    if (value === 'yes') {
      db.collection('user_self').where({
        _id: wx.getStorageSync('user_id')
      }).get({
        success: res => {
          db.collection("rider").add({
            data: {
              _id: wx.getStorageSync('user_id'),
              phone: res.data[0].phone,
              mycredit: 100,
              bill: 0,
              getting: 0,
              mytickets: {
                ticket1:0,
                ticket2:0,
                ticket3:0,
              }
            },
            success: function (res) {
              console.log("添加空白记录成功", res)
              wx.redirectTo({
                url: '/pages/rider/w-01/w-01'
              })
            },
            fail(res) {
              console.log("添加空白记录失败", res)
            }
          })
        }
      })
      
      
    } else if (value === 'no') {
      wx.showModal({
        // title: '提示',
        content: '不，你不想',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'pages/rider/windex/windex',     //返回首页
            })
          } 
        }
      })
    }
  },
})