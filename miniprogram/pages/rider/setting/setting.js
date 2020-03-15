const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({
  data: {
    rid: '',
    actionShow: false,
    actions: [{
      name: '退出登录'
    }]
  }
})