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
    canLower: true, //触底函数控制变量
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
    t.setData({
      canLower: false, // 触底函数关闭
    });
    util.NetRequest({
      url: '/lessee/company/unit/list',
      params: params,
      success: (res) => {
        let _list = res.data.list || [];
        t.setData({
          canLower: true, //有新数据，触底函数开启，为下次触底调用做准备
          companyUnitList: this.data.page > 1 ? this.data.companyUnitList.concat(_list) : _list,
          count: res.data.count
        })
      }
    })
  },

  lower: function (e) {
    /* ------------------------- */
    if (!this.data.canLower) return; //如果触底函数不可用，则不调用网络请求数据
    /* ------------------------- */
    if (this.data.page * this.data.pageSize >= this.data.count) {
      console.log("没有数据了");
      return;
    }
    console.log("到底了！请求下一页");
    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getCompanyUnitList();
    });
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