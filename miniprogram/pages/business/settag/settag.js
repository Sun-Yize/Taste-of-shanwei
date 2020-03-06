// pages/business/settag/settag.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {

    nickname: '',
    items: [
      { value: '麻辣香锅', checked: '' },
      { value: '甜品饮品', checked: '' },
      { value: '健康早餐', checked: '' },
      { value: '快餐', checked: '' },
      { value: '面食', checked: '' },
      { value: '盘餐', checked: '' },
    ],
    arr: [], //标签数组：用来存储选中的值
  },

  //选择标签方法
  checkLabs(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      value = e.currentTarget.dataset.value,
      items = that.data.items,
      arr = that.data.arr,
      val = items[index].checked, //点击前的值
      limitNum = 5,
      curNum = 0; //已选择数量

    //选中累加
    for (var i in items) {
      if (items[i].checked) {
        curNum += 1;
      }
    }

    if (!val) {
      if (curNum == limitNum) {
        wx.showModal({
          content: '选择数量不能超过' + limitNum + '个',
          showCancel: false
        })
        return;
      }
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }

    }
    items[index].checked = !val;

    that.setData({
      items: items,
      arr: arr
    })

  },


  //默认选中为true的
  selectEd(e) {
    var that = this,
      arr = that.data.arr,
      items = that.data.items
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked) {
        var value = items[i].value;
        arr.push(value);
        that.setData({
          items: items,
          arr: arr
        })
      }
    }
  },


  goindex: function (options) {
    var _this = this
      console.log(this.data.arr)
      var id=this.data.id
 
    //上传到数据库
    db.collection('restaurant').doc(id).update({
      data:{
        taste:this.data.arr
      }

    })

    // db.collection('restuarant')
    //   .where({
    //     _openid: _.eq('userInfo.openid'),
    //   })
    //   .get().then(res => {
    //     //未有记录，则增加初始空白记录
    //     if (res.data == 0) {
    //       console.log("未有该用户openid记录,正在添加空白记录中", res.data)
    //       db.collection("restuarant").add({
    //         data: {
    //           _openid: _.eq('userInfo.openid')
    //         },
    //         success: function (res) {
    //           db.collection("restuarant").add({
    //             data: {
    //               _id: res._id,
    //               taste: _this.data.arr,
    //               star: []
    //             },
    //             success: function (res) {
    //               console.log("添加用户空白记录成功", res)
    //               wx.setStorageSync('user_id', res._id)
    //             },
    //             fail(res) {
    //               console.log("添加用户空白记录失败", res)
    //             }
    //           })
    //         }
    //       })
    //     }
    //     //已有此openid记录，则查询记录
    //     else {
    //       wx.setStorageSync('user_id', res.data[0]._id)
    //       db.collection('restuarant').doc(res.data[0]._id).update({
    //         data: {
    //           taste: this.data.arr
    //         },
    //         success: function (res) {
    //           console.log('添加成功', res)
    //         }
    //       })
    //     }
      // })
    wx.navigateBack({
      delta:1,
      

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var items=this.data.items
    var id=options.id
    this.setData({
      id:id
    })
    db.collection('restaurant').doc(id).get().then(res => {
      console.log("success")
      console.log(res.data.taste)
      this.setData({
        arr:res.data.taste
      })
      for(var i=0;i<6;i++){
        for(var j=0;j<6;j++){
          if (items[i].value == res.data.taste[j]){
            items[i].checked=true

          }
        }
        
      }
      this.setData({
        items:items
      })

    })






  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    // var id=option.id
    // console.log('id')
    // this.selectEd();
    // db.collection('restuarant').doc(id).get().then(res => {
    //   console.log("success")

    // }
    // )

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

  },


})


