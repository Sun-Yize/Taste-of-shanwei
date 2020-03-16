Page({
  data: {
    imgUrls: [
      "../image/index2.jpg",
      "../image/index1.jpg"
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  click_swiper: function (e) {
    // 当点击图片上的事件的时候，触发这个函数
    wx.navigateTo({
      url: '../user/news/news',
    })
  }
})