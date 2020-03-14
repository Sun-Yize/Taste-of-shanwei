const db = wx.cloud.database();
const _ = db.command;
const restaurantCollection = db.collection('dish');
Page({
  data: {
    tasks: [],//初始数据
    foodlist: [],

    activeId: [],
    leftMenuList: [{
      "id": "pancan",
      "floor": "盘餐"
    }, {
      "id": 'drink',
      "floor": "饮品"
      }, {
        "id": "breakfast",
        "floor": "早餐"
      }, {
        "id":'fastfood',
        "floor": "快餐"
      }, {
        "id": 'noodles',
        "floor": "面食"
      }, {
        "id": 'fruit',
        "floor": "水果"
      }]

  },

  selectFloor(e) {
    var m = this.data.tasks1;
    var id = e.currentTarget.dataset.id;
    console.log(e);
    
    console.log(id)
    var list = []
    for (var i = 0; i < m.length; i++) {
      if (m[i].tag == id) {
        list.push(m[i])
      }
      
    }

    this.setData({
      foodlist: list,
      activeId: e.currentTarget.dataset.id
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activeId: options.activeId
    })
    //console.log(res)
    db.collection("dish")
      .where({
        tag: _.in([ 'pancan', 'drink', 'breakfast','fastfood','noodles','fruit'])
      })
      //.get().then(console.log)
      .get().then(res => {
        console.log(res)
        this.setData({
          tasks1: res.data,
        })
        //初始显示
        var p = this.data.tasks1;
        var id = options.activeId;
        
        //console.log(p.length)
        console.log(id)
        var list0 = []
        for (var i = 0; i < p.length; i++) {
          if (p[i].tag == id) {
            list0.push(p[i])
          }
        }
        this.setData({
          tasks: list0,     
        })       
      })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  gotores: function(e){
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '../store/store?id=' + e.target.dataset.id,
    })
  }
})