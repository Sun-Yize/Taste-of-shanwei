// miniprogram/pages/home/where/where.js
var app = getApp()
Page({
  data: {
    schoolList: ['北京大学'],
    schoolSelected: '北京大学',
    refectoryList: {
      '北京大学': [{
        name: '馨园一层'
      }, {
        name: '馨园二层'
      }, {
        name: '馨园三层'
      }, {
        name: '荟园一层'
      }, {
        name: '荟园二层'
      }, {
        name: '泰园一层'
      }, {
        name: '泰园二层'
      }, {
        name: '泰园三层'
      }, {
        name: '泰园四层'
      }, {
        name: '雀园一层'
      }]
    },
    refectorys: [],
    isAllRefectorySelected: true,
    selectedRefectory: null,
    ratioList: ['贵人', '爱妃','贵妃','皇贵妃', '纯元皇后'],
    userInfo: {}
  },
  //事件处理函数
  onLoad: function () {
    this.onReset()
  },
  // 选择学校
  onSchoolChange: function (e) {
    var selectedSchool = this.data.schoolList[e.detail.value];
    this.setData({
      schoolSelected: selectedSchool
    });
    this.onReset();
  },
  // 随机食堂
  onStartSelect: function () {
    var totalCount = 0, selectedIndex = 0;
    var tempRefectorys = this.data.refectorys;
    tempRefectorys.forEach(
      function (item) {
        if (item.selected)
          totalCount += item.ratio;
      }
    );
    if (totalCount < 1) {
      this.setData({
        selectedRefectory: null
      });
      return;
    }
    var randomNum = Math.floor(Math.random() * totalCount) + 1;
    for (let i = 0, len = tempRefectorys.length; i < len; i++) {
      if (!tempRefectorys[i].selected)
        continue;
      randomNum -= tempRefectorys[i].ratio;
      if (randomNum <= 0) {
        selectedIndex = i;
        break;
      }
    }
    var currentRefectory = tempRefectorys[selectedIndex];
    this.setData({
      selectedRefectory: currentRefectory
    });
  },
  // 删除当前选项并重新随机
  onDeleteandSelect: function () {
    var name = this.data.selectedRefectory.name;
    var index = this.data.refectorys.findIndex(function (element) { return element.name == name });
    var currentArr = this.data.refectorys;
    if (currentArr.length < 1 || index < 0) {
      return;
    }
    currentArr[index].selected = false;
    this.setData({
      // 注意此处，如果重新选择学校，那么删除选项将变回来
      refectorys: currentArr
    });
    this.checkIsAll();
    this.onStartSelect();
  },
  // 食堂复选框
  checkboxChangeRefectory: function (e) {
    var names = e.detail.value;
    var currentArr = this.data.refectorys;
    currentArr.forEach((item) => {
      var index = names.findIndex(function (element) { return element === item.name });
      item.selected = index >= 0 ? true : false;
    });
    this.setData({
      refectorys: currentArr
    });
    this.checkIsAll();
  },
  // 全选或全不选食堂
  checkboxChangeRefectoryAll: function (e) {
    let currentArr = this.data.refectorys;
    let status = e.detail.value.length > 0 ? true : false;
    currentArr.forEach((item) => {
      item.selected = status;
    });
    this.setData({
      refectorys: currentArr
    });
  },
  // 重置食堂
  onReset: function (e) {
    let currentRefectory = Object.create(this.data.refectoryList[this.data.schoolSelected]);
    currentRefectory.forEach(function (item) {
      item.selected = true;
      item.ratio = 1;
    });
    this.setData({
      refectorys: this.data.refectoryList[this.data.schoolSelected],
      selectedRefectory: null,
      isAllRefectorySelected: true
    });
  },
  // 更改倍率
  onRatioChange: function (e) {
    var ratio = +e.detail.value + 1;
    var name = e.target.dataset.refectory;
    var tempRefectorys = this.data.refectorys;
    tempRefectorys.forEach(function (item) {
      if (item.name == name) {
        item.ratio = ratio;
      }
    });
    this.setData({
      refectorys: tempRefectorys
    });
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '就决定是你了！',
      path: '/pages/index/index',
      success: function () { }
    }
  },
  // 检查是否所有食堂都被勾选
  checkIsAll: function () {
    let result = this.data.refectorys.every((item) => {
      return item.selected == true;
    })
    this.setData({
      isAllRefectorySelected: result
    })
  }
})
