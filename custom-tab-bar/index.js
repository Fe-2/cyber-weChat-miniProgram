Component({
  data: {
    show: true,
    selected: 'index',
    color: "#333",
    selectedColor: "#FF4D4D",
    "list": [{
      "pagePath": "../../pages/index/index",
      "iconPath": "../../../img/x.png",
      "selectedIconPath": "../../../img/x.png",
      "text": "设备",
      "index": 'index'
    }, {
      "pagePath": "../../pages/alarm/alarm",
      "iconPath": "../../../img/x.png",
      "selectedIconPath": "../../../img/x.png",
      "text": "告警",
      "index": 'alarm'
    }, {
      "pagePath": "../../pages/my/my",
      "iconPath": "../../../img/x.png",
      "selectedIconPath": "../../../img/x.png",
      "text": "我的",
      "index": 'my'
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url});
    }
  }
})