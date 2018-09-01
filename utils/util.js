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
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: title,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: title,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}
const hideLoading = () => {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
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

const isEmptyString = val => {
  if (null == val || undefined == val || '' == val.trim()){
    return true;
  }
  return false;
};

module.exports = {
  formatTime: formatTime,
  setTitle: setTitle,
  showLoading: showLoading,
  hideLoading: hideLoading,
  getUserInfo: getUserInfo,
  NetRequest: NetRequest,
  isEmptyObj: isEmptyObj,
  isEmptyString: isEmptyString
}
