// pages/fee/item/list/index.js
import util from "../../../../utils/util.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feeItemList: [],
    itemName: null,
    itemId: null, //编辑的id
    page: 1,
    pageSize: 99,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("收费项目");
  },

  Add: function () {
    let t = this;
    wx.redirectTo({
      url: '../add/index',
    })
  },

  Edit: function (event) {
    let t = this;
    wx.redirectTo({
      url: '../add/index?itemName=' + event.target.dataset.name + '&itemId=' + event.target.dataset.id,
    })
  },

  getFeeItemList() {
    let params = {
      itemName: this.data.itemName, //非必填 
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (res) => {
        let _list = res.data.list || [];
        t.setData({
          feeItemList: _list
        })
      }
    })
  },
  
  feeItemDel: function (event) {
    let params = {
      itemId: event.target.dataset.id, //项目Id 必填
    }
    let t = this;
    util.NetRequest({
      url: "/fee/item/del",
      params: params,
      success: (data) => {
        console.log(data.data, "删除收费项目");
        t.getFeeItemList();
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
    this.getFeeItemList();
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