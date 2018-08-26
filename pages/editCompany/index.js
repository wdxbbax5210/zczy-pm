// pages/editCompany/index.js
import util from "../../utils/util.js";
let header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false, //是否登录
    companyId: '', //企业ID
    ifFromApprove: false, //是否来自审核页面
    userId: null, //所编辑用户的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("编辑用户企业");
    let t = this;
    if (options.from == "approve") {
      console.log(options, "来自用户审核编辑用户企业")
      this.setData({
        ifFromApprove: true,
        userId: options.userId,
        companyId: options.companyId
      })
    }
  },
  onCompanyChange(e) {
    console.log(e)
    this.setData({
      companyId: e.detail.value
    })
  },
  onConfirm() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
    if (this.data.ifFromApprove) {
      wx.switchTab({
        url: '../approveList/approvelist',
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
      url: '/user/edit',
      params: {
        userId: this.data.userId,
        phoneNumber: this.data.phoneNumber
      },
      success: (res) => {
        console.log(res)
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