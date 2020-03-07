const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    cashBalance: 0,     //总收入
    cash_left:0,
    drawMoeny: '',
  },

  comment: function (e) {
    console.log(e.detail.value)
    this.setData({
      comment: e.detail.value,
    })
  },

  onLoad (options) {
    console.log('从上一页传入总收入：',options.cash)
    console.log('从上一页传入余额：', options.cash_left)
    this.setData({
      cashBalance: options.cash,
      cash_left: options.cash_left
    })
  },
  
  onallDrawBalance () {
    this.setData({
      drawMoeny: this.data.cash_left
    })
  },

  onDrawBalanceChange (e) {
    let num = e.detail
    this.setData({
      drawMoeny: num
    })
  },

  onconfrimDraw () {
    let _this = this
    let tmp = wx.getStorageSync('user_id')
    db.collection('rider').doc(tmp).update({
      data: {
        drawmoney: db.command.push(_this.data.drawMoeny),
      },
      success:res =>{
        console.log('提款金额已上传：', _this.data.drawMoeny)
        db.collection('rider').doc(tmp).get({
          success:res =>{
            console.log(res.data.drawmoney)
            var drawMoeny_all = res.data.drawmoney.map(Number).reduce(
              (a, i) => a + i
            )
            console.log(drawMoeny_all)
            var cash_left = _this.data.cashBalance - drawMoeny_all
            console.log('可提余额：', cash_left)
            if (_this.data.drawMoeny === '0' || _this.data.drawMoeny === '') {
              wx.showToast({
                title: '提现金额不能为空',
                icon: 'none'
              })
              db.collection('rider').doc(tmp).update({
                data: {
                  drawmoney: db.command.pop(),
                },
                success:res=>{
                  cons.log('提现失败')
                }
              })
            } else {
              if (cash_left < 0) {
                wx.showToast({
                  title: '余额不足',
                  icon: 'none',
                  duration: 2000
                })
                db.collection('rider').doc(tmp).update({
                  data: {
                    drawmoney: db.command.pop(),
                  },
                  success: res => {
                    cons.log('提现失败')
                  }
                })
              } else {
                //提款函数
                wx.showToast({
                  title: '提款成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          }
        })
      }
    })
  }
})