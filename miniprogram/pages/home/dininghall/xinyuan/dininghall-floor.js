const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    tasks: [],
    condition: {},
    activeId: 0,
    leftMenuList: [{
      "id": 0,
      "floor": "一楼"
    }, {
      "id": 1,
      "floor": "二楼"
    }, {
      "id": 2,
      "floor": "三楼"
    }]
  },

  selectFloor(e) {
    this.setData({
      condition: {},
      tasks: [],
      activeId: e.currentTarget.dataset.id
    })
    this.onLoad(true)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    db.collection("restaurant")
      .where({
        place1: 0
      }).where({
        place2: this.data.activeId
      })
      .get().then(res => {
        this.setData({
          tasks: res.data
        })
        for (var i = 0; i < this.data.tasks.length; i++) {
          if (this.data.tasks[i].on == true) {
            var c = "condition[" + i + "]"
            this.setData({
              [c]: '营业中'
            })
          } else {
            var c = "condition[" + i + "]"
            this.setData({
              [c]: '休息中'
            })
          }
        }
      })
  },

  getIntoStore: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../store/store?id=' + e.target.dataset.item._id,
    })
  },

  onPullDownRefresh: function() {
    this.onLoad(true)
    wx.stopPullDownRefresh();
  }
})