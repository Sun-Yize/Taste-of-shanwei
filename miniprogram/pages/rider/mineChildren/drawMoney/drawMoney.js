Page({
  data: {
    cashBalance: 0,     //余额
    drawMoeny: '',
  },

  onLoad () {

  },

  onShow () {

  },
  
  onallDrawBalance () {
    this.setData({
      drawMoeny: this.data.cashBalance
    })
  },

  onDrawBalanceChange (e) {
    let num = e.detail
    this.setData({
      drawMoeny: num
    })
  },

  onconfrimDraw () {
    if (this.data.num > this.data.cashBalance) {
      wx.showToast({
        title: '余额不足'
      })
    }else{
      if (this.data.drawMoeny === '') {
        wx.showToast({
          title: '提现金额不能为空',
          icon: 'none'
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
    // console.log(this.data.drawMoeny === '');
  }
})