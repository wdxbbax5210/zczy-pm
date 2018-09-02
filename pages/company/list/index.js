// pages/company/list/index.js
import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: [],
    buttons: [{
      key: 0,
      name: '编辑'
    }, {
      key: 1,
      name: '删除'
    }],
    page: 1,
    pageSize: 10,
    count: 0,
    companyName: null,
    userInfo: wx.getStorageSync("userInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("租户企业");
    this.getCompanyList();
  },
  Add: function () {
    let t = this;
    wx.navigateTo({
      url: '../add/index',
    })
  },
  Edit: function (companyId, companyName, unitNumber) {
    let t = this;
    wx.navigateTo({
      url: '../add/index?companyName=' + companyName + '&itemId=' + companyId + '&unitNumber=' + unitNumber
    })
  },
  Del: function (companyId) {
    let params = {
      companyId: companyId //企业ID
    }
    let t = this;
    util.NetRequest({
      url: "/lessee/company/del",
      params: params,
      success: (data) => {
        console.log("删除租户企业")
        t.getCompanyList()
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
    if (option == 0) {
      let companyId = event.target.dataset.id;
      let companyName = event.target.dataset.item.companyName;
      let unitNumber = event.target.dataset.item.unitNumber;
      this.Edit(companyId, companyName, unitNumber);
      return;
    }
    if (option == 1) {
      let companyId = event.target.dataset.id;
      this.Del(companyId);
    }
  },
  getCompanyList() {
    let params = {
      companyName: this.data.companyName, //非必填 
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/lessee/company/list',
      params: params,
      success: (res) => {
        let _list = res.data.list || [];
        t.setData({
          companyList: _list
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
    //this.getCompanyList()
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