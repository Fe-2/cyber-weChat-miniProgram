//login.js
const app = getApp();
const { http } = require('../../plugins/http/index');

Page({
  data: {
    step: 1,
    encryptedData: '',
    iv: '',
  },
  getPhoneNumber (e) {
    const self = this;
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.iv) {
      self.setData({
        step: 2,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
      });
    } else {
      wx.showToast({
        title: '获取失败',
        icon: 'error',
        duration: 2000
      })
    }
  },
  getUserInfo: function(e) {
    const self = this;
    const globalData = app.globalData;
    globalData.userInfo = e.detail.userInfo;
    http.api['Login']({
      params: {
        code: globalData.wxLoginCode,
        rawData: globalData.userInfo.rawData,
        signature: globalData.userInfo.signature,
        iv: self.data.iv,
        encryptedData: self.data.encryptedData,
      },
      success(res){
        console.log(res);
        wx.switchTab({url: '../my/my'});
      },
    });
  }
})
