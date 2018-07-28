//app.js
const { Provider } = require('./redux/wechat-weapp-redux.js');
const configureStore = require('./configureStore.js');

App(Provider(configureStore())({
  onLaunch: function () {
    console.log("加载")
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    header: { 'Cookie': '' }, //这里还可以加入其它需要的请求头，比如'x-requested-with': 'XMLHttpRequest'表示ajax提交，微信的请求时不会带上这个的
    origin: 'https://www.zczygzh.cn'
  }
}))