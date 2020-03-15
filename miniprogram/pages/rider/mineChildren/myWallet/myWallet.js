const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    cash: 0,
    cash_left: 0
  },

  onShow() {
    this.getincoming()
  },

  getincoming() {
    var allIncoming = []
    let _this = this
    let tmp = wx.getStorageSync('user_id')
    db.collection('order').where({
      rid_id: tmp,
      condition: 4
    }).get({
      success: res => {
        for (var i = 0; i < res.data.length; i++) {
          allIncoming.push(parseFloat(res.data[i].money))
        }
        var cash = allIncoming.map(Number).reduce(
          (a, i) => a + i
        )
        console.log('总收入:', cash)
        this.setData({
            cash: cash
          }),
          db.collection('rider').doc(tmp).get({
            success: res => {
              let drawMoeny_all = res.data.drawmoney.length > 0 ? res.data.drawmoney
                .map(Number).reduce(
                  (a, i) => a + i
                ) : 0
              console.log('共提取过：', drawMoeny_all)
              var cash_left = cash - drawMoeny_all
              console.log('可提余额：', cash_left)
              this.setData({
                cash_left: cash_left
              })
            }
          })
      }
    })
  },

  ondrawMoney() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/drawMoney/drawMoney?cash=' + this.data.cash + '&cash_left=' + this.data.cash_left
    })
  }
})