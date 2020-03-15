const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({
  data: {
    list: [{
        title: '取消订单',
        id: 0,
        rule: '取消一次订单扣信用分5分'
      },
      {
        title: '多次取消订单',
        id: 1,
        rule: '取消第一次扣信用分5分，第二次扣10分，以此类推'
      },
      {
        title: '完成一单',
        id: 2,
        rule: '完成一次订单加信用分5分'
      },
      {
        title: '日常用品帮买帮送',
        id: 3,
        rule: '完成一次订单加信用分8分'
      },
      {
        title: '配送违规处罚',
        id: 4,
        rule: '暂无'
      },
      {
        title: '信用分奖励',
        id: 5,
        rule: '可兑换三种类型的代金券'
      },
    ],
    title: '取消订单',
    rule: '',
    initId: 0
  },

  onLoad() {

  },

  onclickBtn(e) {
    console.log(e.currentTarget.dataset.id);
    let data = this.data.list
    let id = e.currentTarget.dataset.id
    let title = data[id].title
    let rule = data[id].rule
    this.setData({
      title,
      rule,
      initId: id
    })
  }
})