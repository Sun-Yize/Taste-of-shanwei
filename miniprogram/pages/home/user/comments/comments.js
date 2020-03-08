// const app = getApp();
// const db = wx.cloud.database();
// const _ = db.command

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     items: []
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var userInfo = wx.getStorageSync('userInfo')
//     this.setData({
//       userInfo: userInfo
//     })
//     var openid = userInfo.openid
//     var billmoney = []
//     var evaluatedetail = []
//     var dish = []
//     var item = []

//     console.log(openid)
//     db.collection('order').where({
//       _openid: openid,
//     })
//       .get({
//         success: (res) => {
//           // res.data 是包含以上定义的两条记录的数组
//           console.log(res.data)
//           for (var i = 0; i < res.data.length; i++) {
//             billmoney.push(res.data[i].billmoney)
//             evaluatedetail.push(res.data[i].evaluatedetail)
//             dish.push(res.data[i].dish)
//           }
//           console.log(dish)

//           for (var j = 0; j < res.data.length; j++) {
//             item.push({
//               billmoney: billmoney[j],
//               evaluatedetail: evaluatedetail[j],
//               dish: dish[j],

//             })
//           }
//           console.log(item)
//           this.setData({
//             items: item

//           })
//           console.log(items)
//         }
//       })


//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成1
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    var openid = userInfo.openid
    var billmoney = []
    var evaluatedetail = []
    var resname = []
    var item = []
    var etime = []

    console.log(openid)
    db.collection('order').where({
      user_id: openid,
    })
      .get({
        success: (res) => {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            billmoney.push(res.data[i].billmoney)
            evaluatedetail.push(res.data[i].evaluatedetail)
            etime.push(res.data[i].etime)
            resname.push(res.data[i].resname)
            //console.log(res.data[1].order.length)
            //  for ( var k = 0;k<res.data[i].order.length;k++){
            //   dish[i].push(res.data[i].order[k].name)
            // }
          }
          // for (var k = 0; k < res.data.length; k++){
          //   for (var m = 0;m <res.data[k].order.length;m++)
          //   dish.push(res.data[k].order[m].name)
          // }
          // console.log(dish)

          for (var j = 0; j < res.data.length; j++) {
            item.push({
              billmoney: billmoney[j],
              evaluatedetail: evaluatedetail[j],
              etime:etime[j],
              resname: resname[j],

            })
            
            
          }
          console.log(resname)
          this.setData({
            items: item

          })
          console.log(items)
        }
      })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成1
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
