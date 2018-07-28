// pages/login/login.js
import util from "../../utils/util"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false //是否登录
  },
  bindGetUserInfo: function (e) {
    let t = this;
    console.log(e.detail.userInfo)
    t.login()
  },
  login: function() {
    if (this.data.logged) return
    util.showLoading('正在登录')
    let t = this;
    wx.login({
      success: function (res) {
        console.log(res)
        util.hideLoading()
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://www.zczygzh.cn/user/query',
            data: {
              code: res.code
            },
            method: 'POST',
            success: ()=>{
              wx.switchTab({
                url: '../home/home'
              })
            }
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    util.hideLoading()
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("授权登录")
    let t = this;
    wx.getSetting({
      success: function (res) {
        console.log(res)
        //已经授权 跳转到首页
        /*if (res.authSetting['scope.userInfo']) {
          //从cookie中获取用户信息
          wx.switchTab({
            url: '../home/home',
          })
          
        }else{ 
          //没有授权 调取登录信息
          t.login();
        }*/
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