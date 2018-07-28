const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const setTitle = (title) => {
  wx.setNavigationBarTitle({
    title: title
  })
}
const showLoading = (title) => {
  wx.showLoading({
    title: title,
    mask: false
  })
}
const hideLoading = () => {
  wx.hideLoading()
}
const getUserInfo = ()=>{
  let user = {};
  wx.getStorageSync({
    key: 'userInfo',
    success: function (res) {
      user = res.data.data
    }
  })
  return user;
}
const NetRequest = ({ url, params, success, fail}) => {
  let header = getApp().globalData.header;
  params.requestId = getApp().globalData.requestId;
  wx.request({
    url: getApp().globalData.origin + url,
    data: params,
    method: 'POST',
    header: header,
    success: (data) => {
      if (data.data){
        success && success(data.data)
      }else{
        console.log(data)
      }
    },
    fail: (err)=>{
      fail && fail(err)
    }
  })
}
/**
 * 检查对象是否为空
 * @param {*} obj
 */
const isEmptyObj = obj => {
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      return false;
    }
  }
  return true;
};
module.exports = {
  formatTime: formatTime,
  setTitle: setTitle,
  showLoading: showLoading,
  hideLoading: hideLoading,
  getUserInfo: getUserInfo,
  NetRequest: NetRequest,
  isEmptyObj: isEmptyObj
}
