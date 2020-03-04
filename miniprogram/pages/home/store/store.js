// pages/store/store.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command
let timer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    editTrue: true,
    showModalStatus: false,
    changeText: '收藏',
    evaluate:[],
    tabState: 0,
    viewTo: "",
    viewToLeft: "",
    listHeight: 300,
    activeIndex: 0,
    tabIndex: 0,
    showModal: false,
    showCart: false,
    heigthArr: [],
    order: {},
    totalMoney: 0,
    activesInfo: {
      1: {
        class: "manjian",
        text: "减"
      },
      2: {
        class: "xindian",
        text: "新"
      },
      3: {
        class: "zhekou",
        text: "折"
      },
      4: {
        class: "daijinquan",
        text: "券"
      },
      5: {
        class: "xinyonghu",
        text: "新"
      },
      6: {
        class: "peisong",
        text: "配"
      },
      7: {
        class: "lingdaijin",
        text: "领"
      },
      8: {
        class: "zengsong",
        text: "赠"
      }
    },
    storeInfo: {
      //服务端获取信息
      
    },
    storeId: 1,
    storeName: "",
    storeImgUrl: "",
    score: 4.4,
    saleMonth: 835,
    minDelPrice: 8,
    delPrice: 5,
    averagePrice: 15,

    service: ["支持自取"],
    actives: [{
      activeId: 1,
      acticeText: "满20减3"
    },
    {
      activeId: 2,
      acticeText: "本店新用户立减1元"
    },
    {
      activeId: 3,
      acticeText: "部分菜品9折起"
    }
    ],
    publicMsg: "",
    food: [],
    place1: 0,
    place2: 0,
    restaurant:[
      ['馨园一楼','馨园二楼','馨园三楼'],
      ['荟园一楼','荟园二楼','0'],
      ['泰园二楼','泰园三楼','泰园四楼'],
      ['雀园一楼','0','0']
    ]
  },

  showChange: function () {
    var that = this;
    if (that.data.editTrue == true) {
      that.setData({
        editTrue: false,
        changeText: '已收藏'
      })

    } else {
      that.setData({
        editTrue: true,
        changeText: '收藏',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({
      res_id: options.id
    })

    db.collection('restaurant').where({
      _id: this.data.res_id
    }).get({
      success: res => {
        console.log(res.data[0].restaurant)
        _this.setData({
          storeName: res.data[0].restaurant,
          storeImgUrl: res.data[0].image,
          publicMsg: res.data[0].notice,
          place1: res.data[0].place1,
          place2: res.data[0].place2
        })
      }
    })

    db.collection('dish').where({
      res_id: this.data.res_id
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
        for (var j = 0; j < res.data.length; j++) {
          id.push(res.data[j]._id),
            name.push(res.data[j].name),
            tag.push(res.data[j].tag),
            src.push(res.data[j].src),
            introduce.push(res.data[j].introduce),
            price.push(res.data[j].price)
        }
        for (var h = 0; h < tag.length; h++) {
          same.push({
            id: id[h],
            tag: tag[h],
            name: name[h],
            src: src[h],
            introduce: introduce[h],
            price: price[h],
            number: 0
          })
          goods.push(same[0])
          same = []
        }
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

    var tag = 0
    var show1 = []
    db.collection('order').where({
      res_id: this.data.res_id,
    }).get({
      success: res => {
        while (tag < res.data.length) {
          if (res.data[tag].evaluate != undefined) {
            // var obj = Object.assign({ neva: 5 - res.data[y].evaluate }, res.data[y]);
            show1.push(res.data[tag])
            this.setData({
              evaluate: show1,
            })
          }
          tag++;
        }
      }
    })


    db.collection('order').where({
      res_id: this.data.res_id
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          evaluate: res.data
        })
      }
    })
    
    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        console.log(res.data.star)
        for(var str = 0;str<res.data.star.length;str++){
          if(res.data.star[str]==this.data.res_id){
            this.setData({
              editTrue: false,
              changeText: '已收藏'
            })  
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let height1, height2;
    let res = wx.getSystemInfoSync();
    let winHeight = res.windowHeight;
    let query = wx.createSelectorQuery();
    query.select(".head").boundingClientRect();
    query.exec(res => {
      height1 = res[0].height;
      let query1 = wx.createSelectorQuery();
      query1.select(".tab").boundingClientRect();
      query1.exec(res => {
        height2 = res[0].height;
        this.setData({
          listHeight: winHeight - height1 - height2
        });
        this.calculateHeight();
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    
    var _this = this
    setTimeout(function () {
      wx.setNavigationBarTitle({
        title: _this.data.storeName
      });
    }, 800)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  //点击导航
  tabSwitch: function (e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabState: index
    })
  },

 
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  selectFood(e) {
    this.setData({
      activeIndex: e.target.dataset.index,
      viewTo: e.target.dataset.titleid
    });
  },
  calculateHeight() {
    let heigthArr = [];
    let height = 0;
    heigthArr.push(height);
    var query = wx.createSelectorQuery();
    query.selectAll(".title-group").boundingClientRect();
    query.exec(res => {
      for (let i = 0; i < res[0].length; i++) {
        console.log(res[0][i])
        height += parseInt(res[0][i].height);
        heigthArr.push(height);
      }
      this.setData({
        heigthArr: heigthArr
      });
    });
  },
  // 手机端有延迟 节流函数效果不好 用防抖函数凑合
  scroll(e) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let srollTop = e.detail.scrollTop;
      for (let i = 0; i < this.data.heigthArr.length; i++) {
        if (
          srollTop >= this.data.heigthArr[i] &&
          srollTop < this.data.heigthArr[i + 1] &&
          this.data.activeIndex != i
        ) {
          this.setData({
            activeIndex: i
          });
          if (i < 3) {
            this.setData({
              viewToLeft: 'title1left'
            })
          } else {
            this.setData({
              viewToLeft: 'title' + (i - 2) + 'left'
            })
          }
          return;
        }
      }
    }, 100)
  },
  add(e) {
    var flag = 0
    var arr = Object.keys(this.data.order);
    var len = arr.length;
    var m = e.target.dataset.id
    var o = this.data.goods[m].number + 1;
    var p = this.data.goods[m].price + this.data.totalMoney
    if (len != 0){
      for(var i=0;i < len;i++){   
        if(this.data.order[i].id == this.data.goods[m].id){
          var n = this.data.order[i].number+1;
          
          var temp1 = 'order['+ i +'].number'
          var temp3 = 'goods['+ m +'].number'
          this.setData({
            [temp1]: n,
            [temp3]: o,
            totalMoney: p
          })
          console.log(this.data.order)
          flag=1
        }
      }
      if(flag == 0){
        console.log(len)   
        var temp2 = 'order[' + len + ']'
        var temp4 = 'goods[' + m + '].number'
        this.setData({
          [temp2]: { 'name': this.data.goods[m].name,'id': this.data.goods[m].id, 'number': 1 },
          [temp4]: o,
          totalMoney: p
        })
        console.log(this.data.order)
      }
    }else{
      console.log(len) 
      var temp2 = 'order[' + len + ']'
      var temp4 = 'goods[' + m + '].number'
      this.setData({
        [temp2]: { 'name': this.data.goods[m].name,'id': this.data.goods[m].id, 'number': 1 },
        [temp4]: o,
        totalMoney: p
      })
      console.log(this.data.order)
    }
  },
  reduce(e) {
    var arr = Object.keys(this.data.order);
    var len = arr.length;
    var m = e.target.dataset.id
    var o = this.data.goods[m].number - 1;
    var p = this.data.totalMoney - this.data.goods[m].price
    for (var i = 0; i < len; i++) {
      if (this.data.order[i].id == this.data.goods[m].id) {
        var n = this.data.order[i].number - 1;
        var temp1 = 'order[' + i + '].number'
        var temp3 = 'goods[' + m + '].number'
        this.setData({
          [temp1]: n,
          [temp3]: o,
          totalMoney: p
        })
        if (this.data.goods[m].number == 0){
          delete this.data.order[i]
        }
        console.log(this.data.order)
      }
    }
  },
  
  selectTabItem(e) {
    if (e.target.dataset.index) {
      this.setData({
        tabIndex: e.target.dataset.index
      });
    }
  },
  preventScrollSwiper() {
    return false;
  },
  showStoreDetail() {
    this.setData({
      showModal: true
    });
  },
  closeModal(e) {
    this.setData({
      showModal: false
    });
  },

  getStar:function(e){
    var flag = 0
    var _this = this
    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        console.log(res.data.star)
        this.setData({
          star: res.data.star
        })
        for (var i = 0; i < this.data.star.length; i++) {
          if (this.data.star[i] == e.target.dataset.item) {
            this.data.star.splice(i, 1);
            flag = 1
          }
        }
        if(flag == 0){
          db.collection('user').doc(wx.getStorageSync('user_id')).update({
            data: {
              star: _.push(e.target.dataset.item)
            }
          })
          wx.showToast({
            title: '收藏成功！',
            icon: 'none',
            duration: 1500
          })
        }else{
          db.collection('user').doc(wx.getStorageSync('user_id')).update({
            data: {
              star: this.data.star
            }
          })
          wx.showToast({
            title: '已取消收藏',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  getIntoStore: function (e) {
    if(this.data.totalMoney > 0){
      wx.navigateTo({
        url: '../pay/pay?id=' + this.data.res_id + '&order=' + JSON.stringify(this.data.order) + '&totalMoney=' + this.data.totalMoney + '&resname=' + this.data.storeName + '&image=' + this.data.storeImgUrl,
      })
    }
  },
  
});