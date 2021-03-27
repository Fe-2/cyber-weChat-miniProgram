const apiList = require('./apiList');
const http = {api: {},};
let version = __wxConfig.envVersion; // 判断运行环境
let prefix;
switch (version) {
  case "develop": //开发预览版
    prefix = "http://192.168.100.51";
    break;
  case 'trial': //体验版
    prefix = "http://192.168.100.51";
    break;
  case 'release': //正式版
    prefix = "https://www.cyber-tron.com";
    break;
  default: //未知,默认调用正式版
    prefix = "https://www.cyber-tron.com";
    break;
}
for (const key in apiList) {
  if (apiList.hasOwnProperty(key)) {
    http.api[key] = (options) => {
      const method = options.method || 'POST';
      const url = prefix + apiList[key];
      const data = options.params || {};
      const success = options.success || function success() {};
      const fail = options.fail || function fail() {};
      const error = options.error || function error() {};
      const complete = options.complete || function complete() {};
      wx.request({
        header: {'content-type': 'application/json'},
        method,
        data,
        url,
        success: function(res) {
          if (res.code == '0') {
            success(res);
          } else {
            fail(res);
            wx.showToast({
              title: res.msg || '参数错误',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: function(res) {
          error(res);
          wx.showToast({
            title: '接口错误',
            icon: 'error',
            duration: 2000
          })
        },
        complete: function(res) {
          complete(res);
        },
      })
    }
  }
}
module.exports = {
  apiList,
  http
};