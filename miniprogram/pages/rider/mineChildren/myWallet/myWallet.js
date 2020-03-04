const app = getApp();
const db = wx.cloud.database();
Page({
  data:{
    cash:0
  },

  onShow(){
    this.getincoming()
  },

  getincoming(){
    var allIncoming = []
    db.collection('users').where({
      _openid: app.globalData.userInfo.openid,
    })
      .get({
        success:res=>{
          console.log(res.data[0].state3)
          db.collection('orders').where({
            _id: db.command.in(res.data[0].state3)
          })
            .get({
              success: res => {
                for (var i = 0; i < res.data.length; i++) {
                  allIncoming.push(parseFloat(res.data[i].money))
                }      
                var cash = allIncoming.map(Number).reduce(
                  (a, i) => a + i
                )     
                console.log(cash)
                this.setData({
                  cash:cash
                })                       
              }
            })
        }
      })
  },

  ondrawMoney() {
    wx.navigateTo({
      url: '/pages/rider/mineChildren/drawMoney/drawMoney'
    })
  }
})