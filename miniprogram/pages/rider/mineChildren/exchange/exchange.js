const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    details:[
      {
        "imageurl":"../../images/youhuiquan.png",
        "title": "3元无门槛优惠券",
        "score":"60"
      },
      {
        "imageurl": "../../images/youhuiquan.png",
        "title": "5元无门槛优惠券",
        "score": "80"
      },
      {
        "imageurl": "../../images/kaixin.png",
        "title": "任意商家15元以内免单",
        "score": "200"
      }
    ]
  },

  exchange(e){
    var index = parseInt(e.currentTarget.dataset.bindex)
    if (index==0){
      wx.showModal({
        title: '提示',
        content: '亲，你确定要用60积分兑换吗？',
        success(res) {
          if (res.confirm) {
          // 函数：检验现有积分是否足够
            db.collection('rider').where({
              _id: wx.getStorageSync('user_id')
            }).get({
                success: res => {
                  var t = res.data[0].mycredit                  
                  if (t > 60) {
                    db.collection('rider').doc(res.data[0]._id).update({
                      data: {
                        mycredit:t-60,
                        mytickets:{
                          ticket1: db.command.inc(1)
                        }
                      },
                      success: function (res) {
                        console.log("3元代金券+1")
                        wx.showToast({
                          title: '兑换成功',
                          icon: 'success',
                          duration: 2000
                        })
                      }
                    })
                  }else{
                    wx.showToast({
                      title: '积分不足，兑换失败',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
          } 
        }
      })
    } 
    else if (index == 1){
      wx.showModal({
        title: '提示',
        content: '亲，你确定要用80积分兑换吗？',
        success(res) {
        if (res.confirm) {
          db.collection('rider')
            .where({
              _id: wx.getStorageSync('user_id')
            })
            .get({
              success: res => {
                var t = res.data[0].mycredit
                if (t > 80){
                  db.collection('rider').doc(res.data[0]._id).update({
                    data: {
                      mycredit: t-80,
                      mytickets: {
                        ticket2: db.command.inc(1)
                      }
                    },
                    success: function (res) {
                      console.log("5元代金券+1")
                      wx.showToast({
                        title: '兑换成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                }else{
                  wx.showToast({
                    title: '积分不足，兑换失败',
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            })
        } 
      }
    })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '亲，你确定要用200积分兑换吗？',
        success(res) {
          // 函数：检验现有积分是否足够
          if (res.confirm) {
            if (res.confirm) {
              db.collection('rider')
                .where({
                  _id: wx.getStorageSync('user_id')
                })
                .get({
                  success: res => {
                    var t = res.data[0].mycredit
                    if (t > 200) {
                      db.collection('rider').doc(res.data[0]._id).update({
                        data: {
                          mycredit: t-200,
                          mytickets: {
                            ticket3: db.command.inc(1)
                          }
                        },
                        success: function (res) {
                          console.log("免单券+1")
                          wx.showToast({
                            title: '兑换成功',
                            icon: 'success',
                            duration: 2000
                          })
                        }
                      })
                    }else{
                      wx.showToast({
                        title: '积分不足，兑换失败',
                        icon: 'none',
                        duration: 1500
                      })
                    }
                  }
                })
            } 
          }
        }
      })
    }
  }
})