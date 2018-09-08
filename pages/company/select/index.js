// pages/company/select/index.js

import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: [], //企业列表
    companyName: null, //按照名字搜索
    pageFrom: null,
    page: 1,
    pageSize: 10,
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompanyList();
    console.log(options, "选企业页面")
    this.setData({
      pageFrom: options.pageFrom,
      callbackData: options
    })
  },
  //获取企业列表 跳转页面选企业
  getCompanyList() {
    let t = this;
    let params = {
      companyName: this.data.companyName,  //昵称
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    console.log(params)
    util.NetRequest({
      url: '/lessee/company/unit/list',
      params: params,
      success: (res) => {
        console.log(res.data, "企业列表")
        this.setData({
          companyList: res.data.list || [],
          count: res.data.count
        })
      }
    })
  },
  /**
   * 搜索企业
   */
  onNameChange(e) {
    this.setData({
      companyName: e.detail.value || null
    }, () => {
      this.getCompanyList();
    })
  },
  /**
   * 选中某人返回上一页带上选中人的id
   */
  onSelectCompany(e) {
    let t = this;
    let data = e.target.dataset;
    let pageFrom = t.data.pageFrom;
    let id = data.id;
    let name = data.name;
    let unit = data.unit;
    let pages = getCurrentPages();
    let prvePage = pages[pages.length - 2];
    if (pageFrom == 'fee_record_add') {
      prvePage.setData({
        companyId: id,
        companyName: name,
        unitNumber: unit
      });
      wx.navigateBack({ delta: 1 });
    }
    if (pageFrom == 'company_edit') {
      prvePage.setData({
        companyId: id,
        companyName: name
      });
      wx.navigateBack({ delta: 1 });
    }
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
   * 页面相关事件处理函数--监听企业下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 企业点击右上角分享
   */
  onShareAppMessage: function () {

  }
})