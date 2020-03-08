const app = getApp();
const db = wx.cloud.database();
const _ = db.command

// Page({

//   onShow: function () {
//     var userInfo = wx.getStorageSync('userInfo')
//     this.setData({
//       userInfo: userInfo
//     })
//     var openid = userInfo.openid
//     console.log(openid)


//     // 实现页面跳转
//     db.collection('restaurant_self').where({
//       _openid: openid,
//     })
//       .get({
//         success: (res) => {

//       setTimeout(function () {
//       //已有商家界面
//       wx.navigateTo({
//         url: "../../business/mine/mine",
//        })
//     }, 300);

//       },
//       fail:(res) =>{
//         db.collection('user_self').where({
//           _openid: openid,
//         })
//           .get({
//             success: (res) => {

//               setTimeout(function () {
//                 //已有用户界面
//                 wx.switchTab({
//                   url: '../../home/user/main/user',
//                 })
//               }, 300);

//             },
//             fail:(res) =>{
//               setTimeout(function () {
//                 //注册界面
//                 wx.navigateTo({
//                   url: "../firstlogin/firstlogin",
//                 })
//               }, 300);
//             }
//           })
//       }
//       })
  






//   }

 

 
// })


Page({

  onLoad: function () {
    var _this = this
    //查询商家个人信息
    db.collection('restaurant_self')
      .where({
        _openid: _.eq('userInfo.openid'),
      })
      .get().then(res => {
        //跳转至商家界面
        console.log(res.data)
        if (res.data.length !== 0) {
           console.log("已有商家")
          setTimeout(function () {
                 //已有商家界面
                 wx.navigateTo({
                   url: '../../business/mine/mine',
                 })
               }, 300);

        }
        else{
          db.collection('user_self')
            .where({
              _openid: _.eq('userInfo.openid'),
            })
            .get().then(res => {
              //不是商家
              if (res.data.length !== 0) {
                console.log("已有用户")
                setTimeout(function () {
                  //已有个人界面
                  wx.switchTab({
                    url: '../../home/user/main/user',
                  })
                }, 300);
              }
                 else{
                    console.log('新用户')
                setTimeout(function () {
                 //注册界面
                 wx.navigateTo({
                   url: "../firstlogin/firstlogin",
                 })
              }, 300);}

            })
          
          }
        
        
      })

  }

})