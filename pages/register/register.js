// pages/register/register.js
import util from "../../utils/util.js";
let header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false, //是否登录
    phoneNumber: '', //手机号码
    ifFromApprove: false, //是否来自审核页面
    userId: null, //所编辑用户的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this;
    if (options.from == "approve"){
      console.log(options,"来自用户审核编辑用户信息")
      this.setData({
        ifFromApprove: true,
        userId: options.userId,
        phoneNumber: options.phoneNumber
      })
    }
    //判断是否已授权 
    wx.getSetting({
      success: function (res) {
        console.log(res)
      }
    })
  },
  onPhoneChange(e){ 
    console.log(e)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  onGetUserInfo: function (e) {
    let t = this;
    let userInfo = e.detail.userInfo;
    userInfo.phoneNumber = this.data.phoneNumber;
    t.login(userInfo)
  },
  login: function (userInfo) {
    if (this.data.logged) return
    userInfo.openId = getApp().globalData.openId;
    userInfo.sessionKey = getApp().globalData.sessionKey;
    userInfo.phoneNumber = this.data.phoneNumber;
    let t = this;
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log(res)
          util.NetRequest({
            url: '/user/login',
            params: {
              // code: res.code,
              userInfo: userInfo,
              // openId: getApp().globalData.openId,
              // sessionKey: getApp().globalData.sessionKey
            },
            success: (res) => {
              let userInfo = res;
              getApp().globalData.header.Cookie = 'JSESSIONID=' + userInfo.sessionId;
              // getApp().globalData.requestId = userInfo.openId;
              wx.setStorageSync("userInfo", userInfo)
              let dialogComponent = t.selectComponent('.wxc-dialog')
              dialogComponent && dialogComponent.show();
            }
          })
      //   } else {
      //     console.log('登录失败！' + res.errMsg)
      //   }
      // }
    // });
  },
  onConfirm() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
    wx.switchTab({
      url: '../index/index',
    })
  },
  confirmEdit(){
    console.log("编辑用户信息", this.data.userId)
    util.NetRequest({
      url: '/user/edit',
      params: {
        userId: this.data.userId,
        phoneNumber: this.data.phoneNumber
      },
      success: (res) => {
        console.log(res)
        // 返回上一页 提示设置成功
        if (res.result == 100){
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})