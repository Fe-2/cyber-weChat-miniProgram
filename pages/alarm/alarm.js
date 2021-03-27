//device.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputVal: "",
    deviceList:[{
      name: '设备 001',
      position: '大门口左1',
      status: true,
    },{
      name: '设备 002',
      position: '大门口左2',
      status: true,
    },{
      name: '设备 003',
      position: '大门口左3',
      status: true,
    },{
      name: '设备 004',
      position: '大门口中',
      status: true,
    },{
      name: '设备 005',
      position: '大门口右1',
      status: true,
    },{
      name: '设备 006',
      position: '大门口右2',
      status: true,
    },{
      name: '设备 007',
      position: '大门口右3',
      status: true,
    },{
      name: '设备 008',
      position: '大门口右4',
      status: true,
    }],
    triggered: false,
  },
  onLoad: function () {
  },
  onShow() {
    const self = this;
    if (typeof self.getTabBar === 'function' && self.getTabBar()) {
      self.getTabBar().setData({selected: 'alarm'});
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷
      wx.showToast({title:'刷新成功'});
    }, 1500);
  },
  refresh: function(e) {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    var self = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.showToast({title:'刷新成功'});
      self.setData({
        triggered: false
      });
    }, 1500);
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
  changeStatus: function(e) {
    var status =  !e.currentTarget.dataset.status;
    var index =  e.currentTarget.dataset.index;
    var val =JSON.parse(`{"deviceList[${index}].status":${status}}`);
    var self = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    wx.request({
      url: 'https://www.cyber-tron.com/nbControl/send',  //如果不设置method 则默认get请求地址
　　　 method: 'post',
      data: {},
      header: {'content-type': 'application/json'},
      success: function() {
        setTimeout(function () {
          wx.hideNavigationBarLoading(); //完成停止加载
          wx.showToast({title:'操作完成'});
          self.setData({
            ...val
          });
        }, 100);
      },
    });
  },
  getDeviceList: function(e) {
    this.setData({
      deviceList: [{name:'TEST',status:false,decs:'测试设备'}],
    })
  }
})
