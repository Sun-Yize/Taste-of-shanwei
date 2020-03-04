var app = getApp();
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    goods: [],
    goodsList: [],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false
  },

  onShow: function() {
    db.collection('dish').where({
      res_id: wx.getStorageSync('current')
    }).get({
      success: (res) => {
        var src = [];
        var introduce = [];
        var id = [];
        var same = [];
        var goods = [];
        var tag = [];
        var name = [];
        var price = []
        //先想办法得到一个goods
        for (var j = 0; j < res.data.length; j++) {
          // a.push(res.data[j].age),
          id.push(res.data[j]._id),
            name.push(res.data[j].name),
            tag.push(res.data[j].tag),
            src.push(res.data[j].src),
            introduce.push(res.data[j].introduce),
            price.push(res.data[j].price)
        }
        // console.log(tag);
        for (var h = 0; h < tag.length; h++) {
          same.push({
            id: id[h],
            tag: tag[h],
            name: name[h],
            src: src[h],
            introduce: introduce[h],
            price: price[h]
          })
          goods.push(same[0])
          same = []
        }
        //得到goodsList
        var array = []
        for (var i = 0; i < tag.length; i++) {
          if (array.indexOf(tag[i]) < 0) {
            array.push(tag[i])
          }
        }
        var good = []
        var goodsList = []
        for (var k = 0; k < array.length; k++) {
          for (var l = 0; l < tag.length; l++) {
            if (tag[l] == array[k]) {
              good.push(l)
            }
          }
          goodsList.push({
            id: 's' + k,
            goods: good,
            classifyName: array[k]
          })
          good = []
        }
        this.setData({
          goods: goods,
          goodsList: goodsList,

        })
        console.log(this.data)
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onGoodsScroll: function(e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function(classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },

  tapClassify: function(e) {
    console.log(e)
    // var id = e.target.dataset.id;
    // this.setData({
    //   classifyViewed: id
    // });
    // var self = this;
    // setTimeout(function() {
    //   self.setData({
    //     classifySeleted: id
    //   });
    // }, 100);
  },
  
  onbindtap: function(e) {
    wx.navigateTo({
      url: "../adddish/adddish"
    })
  }
})