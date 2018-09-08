// pages/company/unit/add/index.js
import util from "../../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: null,
    unitNumber: null,
    message: "信息填写不完整！",
    $toast: {
      show: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.companyId || null
    })
  },
  OnUnitChange(event) {
    this.setData({
      unitNumber: event.detail.value
    })
  },
  onConfirm: function () {
    if (!this.data.companyId) {
      console.log("租户企业ID不存在")
      this.showToast('租户企业ID不存在!')
      return
    }
    this.companyUnitAdd();
  },
  companyUnitAdd: function () {
    if (!this.data.unitNumber) {
      console.log("请输入单元编号")
      this.showToast('请输入单元编号!')
      return
    }
    console.log("执行函数")
    let params = {
      companyId: this.data.companyId, //必填
      unitNumber: this.data.unitNumber, //必填
    }
    console.log("新增单元编号")
    let t = this;
    util.NetRequest({
      url: "/lessee/company/unit/add",
      params: params,
      success: (data) => {
        console.log(data, "新增单元编号")
        t.setData({
          unitNumber: null
        }, () => {
          wx.navigateBack({
            delta: 1
          })
        })
      }
    })
  },
  /**
   * 提示
   */
  showToast(msg) {
    this.setData({ message: msg, $toast: { show: true } });
    setTimeout(() => {
      this.setData({ message: null, $toast: { show: false } });
    }, 1000)
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