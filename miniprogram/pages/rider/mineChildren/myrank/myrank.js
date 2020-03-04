Page({
  data: {
    rankrule: [
      {
        title: "收入榜"
      },
      {
        title: "好评榜"
      }
    ],
    currentTab: 0,
  },


  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    console.log(e.currentTarget.dataset.current)
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },

  // 滚动切换标签样式 
  switchTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current == 0) {
      console.log('收入榜')
    }
    else if (e.detail.current == 1) {
      console.log('好评榜')
    }
  }
})