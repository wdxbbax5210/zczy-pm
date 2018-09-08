// pages/company/unit/list/index.js
import util from "../../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyUnitList: [],
    buttons: [{
      key: 1,
      name: '删除'
    }],
    page: 1,
    pageSize: 10,
    count: 0,
    companyId: null,
    companyName: null,
    userInfo: wx.getStorageSync("userInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("单元编号");
    if (options.companyId) {
      this.setData({
        companyId: options.companyId
      })
    }
  },

  Add: function () {
    let t = this;
    wx.navigateTo({
      url: '../add/index?companyId=' + t.data.companyId,
    })
  },

  Del: function (unitId) {
    let params = {
      unitId: unitId //单元编号ID
    }
    let t = this;
    util.NetRequest({
      url: "/lessee/company/unit/del",
      params: params,
      success: (data) => {
        console.log("删除租户企业的单元编号")
        t.getCompanyUnitList()
      }
    })
  },

  makeOption: function (event) {
    let value = event.detail.value;
    let buttons = this.data.buttons;
    let button = buttons[value];
    if (null == button) {
      console.log("没有选中任何选项");
      return;
    }
    let option = button.key;
    if (option == 1) {
      let unitId = event.target.dataset.id;
      this.Del(unitId);
    }
  },

  getCompanyUnitList() {
    let params = {
      companyId: this.data.companyId, //非必填 
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/lessee/company/unit/list',
      params: params,
      success: (res) => {
        let _list = res.data.list || [];
        t.setData({
          companyUnitList: _list
        })
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
    this.getCompanyUnitList();
    console.log("onShow")
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