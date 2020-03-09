// pages/multiple/multiple.js
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
      { value: '盘餐', checked: 'true' },
      { value: '爱吃面食', checked: 'true' },
      { value: '吃辣小能手', checked: '' },
      { value: '素食主义', checked: '' },
      { value: '甜品爱好者', checked: '' },
      { value: '爱奶茶', checked: '' },
      { value: '就爱吃肉', checked: '' },
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
    var temp = wx.getStorageSync('userInfo')
    wx.navigateTo({
      url: '../../home/user/settings/myData',
    }),
      console.log(this.data.arr)
    //上传到数据库

    db.collection('user_self')
      .where({
        _openid: _.eq('userInfo.openid'),
      })
      .get().then(res => {
        //未有记录，则增加初始空白记录
        if (res.data == 0) {
          console.log("未有该用户openid记录,正在添加空白记录中", res.data)
          db.collection("user_self").add({
            data: {
              _openid: _.eq('userInfo.openid'),
              nickName: temp.nickName,
              avatarUrl: temp.avatarUrl,
              openid: temp.openid,
            },
            success: function (res) {
              db.collection("user").add({
                data: {
                  _id: res._id,
                  taste: _this.data.arr,
                  star: [],
                  nickName: temp.nickName,
                },
                success: function (res) {
                  console.log("添加用户空白记录成功", res)
                  wx.setStorageSync('user_id', res._id)
                },
                fail(res) {
                  console.log("添加用户空白记录失败", res)
                }
              })
            }
          })
        }
        //已有此openid记录，则查询记录
        else {
          wx.setStorageSync('user_id', res.data[0]._id)
          db.collection('user').doc(res.data[0]._id).update({
            data: {
              taste: this.data.arr
            },
            success:function(res){
              console.log('添加成功',res)
            }
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectEd();

    var self = this;
    /**
     * 获取用户信息
     */
    this.setData({
      thumb: wx.getStorageSync("userInfo").avatarUrl,
      nickname: wx.getStorageSync("userInfo").nickName
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

  },

 
})


