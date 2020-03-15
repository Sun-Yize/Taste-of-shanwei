const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classifyViewed: 's0',
    classifySeleted: 's0',
    editTrue: true,
    showModalStatus: false,
    changeText: '收藏',
    evaluate: [],
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
    storeId: 1,
    storeName: "",
    storeImgUrl: "",
    score: 4.4,
    delPrice: 2,
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
    place1: 0,
    place2: 0,
    restaurant: [
      ['馨园一楼', '馨园二楼', '馨园三楼'],
      ['荟园一楼', '荟园二楼', '0'],
      ['泰园二楼', '泰园三楼', '泰园四楼'],
      ['雀园一楼', '0', '0']
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var tag = 0 //遍历时自变量
    var show1 = [] //临时存储数组
    //将商家id从上一界面读取
    this.setData({
      res_id: options.id
    })

    //读取餐馆详细信息
    db.collection('restaurant').where({
      _id: this.data.res_id
    }).get({
      success: res => {
        _this.setData({
          storeName: res.data[0].restaurant,
          storeImgUrl: res.data[0].image,
          publicMsg: res.data[0].notice,
          delivery: Number(res.data[0].delivery),
          place1: res.data[0].place1,
          place2: res.data[0].place2,
        })
        if (res.data[0].on == false) {
          wx.showModal({
            title: '餐厅打烊啦',
            content: '请您稍后再来~',
            showCancel: false,
            success: function(res) {
              wx.navigateBack()
            }
          })
        }
      }
    })

    //读取餐馆对应菜品
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

    //读取餐馆评价
    db.collection('order').where({
      res_id: this.data.res_id,
    }).get({
      success: res => {
        while (tag < res.data.length) {
          if (res.data[tag].evaluate != undefined) {
            var obj = Object.assign({
              neva: 5 - res.data[tag].evaluate
            }, res.data[tag]);
            show1.push(obj)
            this.setData({
              evaluate: show1,
            })
            console.log(this.data.evaluate)
          }
          tag++;
        }
      }
    })

    //读取用户是否曾收藏商家
    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        console.log(res.data.star)
        for (var str = 0; str < res.data.star.length; str++) {
          if (res.data.star[str] == this.data.res_id) {
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
  onReady: function() {
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
  onShow: function() {
    //页面顶部显示商家名称
    var _this = this
    setTimeout(function() {
      wx.setNavigationBarTitle({
        title: _this.data.storeName
      });
    }, 800)
  },

  //侧边栏点击绑定函数
  selectFood(e) {
    console.log(e)
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function() {
      self.setData({
        classifySeleted: id
      });
    }, 100);
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

  scroll(e) {
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

  //添加菜品函数
  add(e) {
    var flag = 0
    var arr = Object.keys(this.data.order);
    var len = arr.length;
    var m = e.target.dataset.id
    var o = this.data.goods[m].number + 1;
    var p = this.data.goods[m].price + this.data.totalMoney
    if (len != 0) {
      for (var i = 0; i < len; i++) {
        if (this.data.order[i].id == this.data.goods[m].id) {
          var n = this.data.order[i].number + 1;
          var temp1 = 'order[' + i + '].number'
          var temp3 = 'goods[' + m + '].number'
          this.setData({
            [temp1]: n,
            [temp3]: o,
            totalMoney: p
          })
          console.log(this.data.order)
          flag = 1
        }
      }
      if (flag == 0) {
        console.log(len)
        var temp2 = 'order[' + len + ']'
        var temp4 = 'goods[' + m + '].number'
        this.setData({
          [temp2]: {
            'name': this.data.goods[m].name,
            'id': this.data.goods[m].id,
            'number': 1
          },
          [temp4]: o,
          totalMoney: p
        })
        console.log(this.data.order)
      }
    } else {
      console.log(len)
      var temp2 = 'order[' + len + ']'
      var temp4 = 'goods[' + m + '].number'
      this.setData({
        [temp2]: {
          'name': this.data.goods[m].name,
          'id': this.data.goods[m].id,
          'number': 1
        },
        [temp4]: o,
        totalMoney: p
      })
      console.log(this.data.order)
    }
  },

  //减少菜品数量函数
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
        if (this.data.goods[m].number == 0) {
          delete this.data.order[i]
        }
        console.log(this.data.order)
      }
    }
  },

  //切换菜单、评价、商家栏
  selectTabItem(e) {
    if (e.target.dataset.index) {
      this.setData({
        tabIndex: e.target.dataset.index
      });
    }
  },

  //点击导航
  tabSwitch: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabState: index
    })
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

  //收藏商家函数
  getStar: function(e) {
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
        if (flag == 0) {
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
        } else {
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

  //收藏按钮变化控制函数
  showChange: function() {
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

  //前往去结算界面
  getIntoStore: function(e) {
    if (this.data.totalMoney >= this.data.delivery) {
      wx.navigateTo({
        url: '../pay/pay?id=' + this.data.res_id + '&order=' + JSON.stringify(this.data.order) + '&totalMoney=' + this.data.totalMoney + '&resname=' + this.data.storeName + '&image=' + this.data.storeImgUrl,
      })
    }
  }

});