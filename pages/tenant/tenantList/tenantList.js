// pages/tenant/tenantList/tenantList.js
import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tanantList:[],
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
    util.setTitle("租户企业")
  },
  Add: function () {
    let t = this;
    wx.navigateTo({
      url: '../../tenant/tanantAdd/tenantAdd',
    })
  },
  Edit: function (event) {
    let t = this;
    wx.navigateTo({
      url: '../../tenant/tanantAdd/tenantAdd?companyName=' + event.target.dataset.name + '&itemId=' + event.target.dataset.id+'&unitNumber='+event.target.dataset.unit
    })
  },
  getTenantList() {
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
        t.setData({
          tenantList: res.data.list
        })
      }
    })
  },
  tenantItemDel: function (event) {
    let params = {
      companyId: event.target.dataset.id, //企业ID
      componyName: event.target.dataset.name,
      unitNumber:event.target.dataset.unit, //单元编号
    }
    let t = this;
    util.NetRequest({
      url: "/lessee/company/del",
      params: params,
      success: (data) => {
        console.log("删除租户企业")
        t.getTenantList()
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
    this.getTenantList()
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