//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabs: [],
    activeTab: 0,
    showSerialSheet: false,
    showTagSheet: false,
    showFiltrateBox: true,
    serialGroups: [
      { text: '扫码添加', value: 1 },
      { text: '输入设备编号', value: 2 },
    ],
    tagGroups: [
      { text: '筛选', value: 1 },
      { text: '房间管理', value: 2 },
    ],
    deviceList:[{
      name: '设备 001',
      position: '大门口左1',
      type: 1,
      status: true,
    },{
      name: '设备 002',
      position: '大门口左2',
      status: true,
    },{
      name: '设备 002',
      position: '大门口左2',
      status: true,
    },{
      name: '设备 002',
      position: '大门口左2',
      status: true,
    }]
  },
  closeSheet(index) {
    const param = {};
    const key = Object.prototype.toString.call(index) === '[object Object]' ? index.currentTarget.dataset.type : index;
    param[`${key}`] = false;
    this.setData(param);
    this.getTabBar().setData({
      show: true
    })
  },
  openSheet(index) {
    const param = {};
    const key = Object.prototype.toString.call(index) === '[object Object]' ? index.currentTarget.dataset.type : index;
    param[`${key}`] = true;
    this.getTabBar().setData({
      show: false
    })
    this.setData(param);
  },
  closeFiltrateBox() {
    this.closeSheet('showTagSheet');
  },
  tagChoose(e) {
    if (e.detail.value === 1) {
      this.setData({
        showTagSheet: false,
        showFiltrateBox: true
      })
    }
  },
  serialChoose(e) {
      this.closeSheet('showSerialSheet')
      if (e.detail.value === 1) {
        wx.scanCode({
          success (res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '无法识别',
              icon:'error'
            })
          }
        })
      }
  },
  onLoad() {
    const tabs = [
      {
        title: '所有设备',
        list: [],
      },{
        title: '房间',
        list: [],
      },{
        title: '楼道1',
        list: [],
      },{
        title: '厨房',
        list: [],
      },{
        title: '楼道2',
        list: [],
      },{
        title: '厕所',
        list: [],
      },{
        title: '二楼',
        list: [],
      },
    ]
    this.setData({ tabs })
  },
  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
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
