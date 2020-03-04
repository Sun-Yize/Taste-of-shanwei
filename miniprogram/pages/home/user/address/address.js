const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    
     addreValue: 0,
    addreRange: ['宿舍楼1号', '宿舍楼2号', '宿舍楼3号', '宿舍楼4号', '宿舍楼5号', '宿舍楼6号', '宿舍楼7号', '宿舍楼8号', '宿舍楼9号', '宿舍楼10号', '宿舍楼11号', '宿舍楼12号', '宿舍楼13号', '宿舍楼14号', '宿舍楼15号', '宿舍楼16号', '宿舍楼17号', '宿舍楼18号', '宿舍楼19号', '宿舍楼20号', '宿舍楼21号', '宿舍楼22号', '宿舍楼23号', '宿舍楼24号'],
    tname: '',
    phone: '',
    detail: '',
    current:'暂无配送地址',
  },
  onShow(options) {

    db.collection('user').doc(wx.getStorageSync('user_id')).get({
      success: res => {
        if(res.data.destination!=undefined){
          this.setData({
            tname: res.data.tname,
            phone: res.data.phone,
            current: res.data.destination,
          })
        }else{
          this.setData({
            tname: res.data.tname,
            phone: res.data.phone,
          })
        }
        
      }
    })

    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    }) 
  },
  
  addrePickerBindchange: function (e) {
    this.setData({
      addreValue: e.detail.value,
      current: this.data.addreRange[e.detail.value],
    })
  },
  
  formSubmit(e) {
    const value = e.detail.value;
    if (value.tname && value.phone &&this.data.current!=='暂无配送地址' ) {
      db.collection('user').doc(wx.getStorageSync('user_id')).update({
        data: {
          tname: value.tname,
          destination: this.data.current,
          phone: value.phone
        },
        success(res) {
          console.log('信息提交成功', res),
          wx.showModal({
            title: '成功提示',
            content: '保存地址成功！',
            showCancel: false,
            success: function (res) {
              wx.navigateBack()
            },
          })
        },
        fail(res) {
          console.log('信息提交失败', res)
          wx.navigateBack();
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  },

})


