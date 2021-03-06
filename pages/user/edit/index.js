// pages/user/edit/index.js
import util from "../../../utils/util.js";
let header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    $toast: {
      show: false
    },
    message: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false, //是否登录
    phoneNumber: '', //手机号码
    ifFromApprove: false, //是否来自审核页面
    userId: null, //所编辑用户的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util.setTitle("编辑用户信息");
    let t = this;
    if (options.from == "approve") {
      console.log(options, "来自用户审核编辑用户信息")
      this.setData({
        ifFromApprove: true,
        userId: options.userId,
        phoneNumber: options.phoneNumber
      })
    }
  },
  onPhoneChange(e) {
    console.log(e)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  onConfirm() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
    if (this.data.ifFromApprove) {
      wx.navigateBack({
        delta: 1
      });
      return;
    }
    wx.switchTab({
      url: '../index/index',
    })
  },
  confirmEdit() {
    console.log("编辑用户信息", this.data.userId)
    util.NetRequest({
      url: '/user/phone/number',
      params: {
        userId: this.data.userId,
        phoneNumber: this.data.phoneNumber
      },
      success: (res) => {
        console.log(res)
        if (res.result == "313") {
          this.showToast(res.message);
        }
        // 返回上一页 提示设置成功
        if (res.result == 100) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  /**
   * 提示
   */
  showToast(msg, callback) {
    this.setData({ message: msg, $toast: { show: true } });
    setTimeout(() => {
      this.setData({ message: null, $toast: { show: false } }, () => {
        if (callback) {
          callback();
        }
      });
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})