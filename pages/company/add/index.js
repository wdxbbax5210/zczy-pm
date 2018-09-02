// pages/company/add/index.js
import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: null,
    unitNumber: null,
    itemId: null,
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
      companyName: options.companyName || null,
      unitNumber: options.unitNumber || null,
      itemId: options.itemId || null
    })
  },
  OnUnitChange(event) {
    this.setData({
      unitNumber: event.detail.value
    })
  },
  OnNameChange(event) {
    this.setData({
      companyName: event.detail.value
    })
  },
  onConfirm: function () {
    if (this.data.itemId) {
      this.companyUpdate();
    } else {
      this.companyAdd();
      console.log("点击确认")
    }
  },
  companyAdd: function () {
    if (!this.data.companyName) {
      console.log("请输入租户名称")
      this.showToast('请输入租户名称!')
      return
    }
    if (!this.data.unitNumber) {
      console.log("请输入单元编号")
      this.showToast('请输入单元编号!')
      return
    }
    console.log("执行函数")
    let params = {
      companyName: this.data.companyName, //必填 
      unitNumber: this.data.unitNumber, //单元编号
    }
    console.log("新增")
    let t = this;
    util.NetRequest({
      url: "/lessee/company/add",
      params: params,
      success: (data) => {
        console.log(data, "新增")
        t.setData({
          companyName: null,
          unitNumber: null,
          itemId: null
        }, () => {
          wx.navigateBack({
            delta:1
          })
        })
      }
    })
  },
  companyUpdate: function () {
    let t = this;
    if (!this.data.companyName) {
      console.log("请输入租户名称")
      this.showToast('请输入租户名称!')
      return
    }
    if (!this.data.unitNumber) {
      console.log("请输入单元编号")
      this.showToast('请输入单元编号!')
      return
    }
    let params = {
      companyName: this.data.companyName, //必填 
      unitNumber: this.data.unitNumber, //单元编号
      companyId: this.data.itemId, //项目Id 必填
    }
    console.log("编辑")
    util.NetRequest({
      url: '/lessee/company/upd',
      params: params,
      success: (data) => {
        console.log(data.data, "更新")
        t.setData({
          companyName: null,
          unitNumber: null,
          itemId: null
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