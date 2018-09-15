// pages/company/select/index.js

import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyUnitList: [], //企业列表
    companyName: null, //按照名字搜索
    pageFrom: null,
    page: 1,
    pageSize: 10,
    count: 0,
    canLower: true, //触底函数控制变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCompanyUnitList();
    console.log(options, "选企业页面")
    this.setData({
      pageFrom: options.pageFrom,
      callbackData: options
    })
  },
  //获取企业列表 跳转页面选企业
  getCompanyUnitList() {
    let t = this;
    let params = {
      companyName: this.data.companyName, //昵称
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    console.log(params)
    t.setData({
      canLower: false, // 触底函数关闭
    });
    util.NetRequest({
      url: '/lessee/company/unit/list',
      params: params,
      success: (res) => {
        console.log(res.data, "企业列表")
        let _list = res.data.list || [];
        t.setData({
          canLower: true, //有新数据，触底函数开启，为下次触底调用做准备
          companyUnitList: this.data.page > 1 ? this.data.companyUnitList.concat(_list) : _list,
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
      this.getCompanyUnitList();
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
      wx.navigateBack({
        delta: 1
      });
    }
    if (pageFrom == 'company_edit') {
      prvePage.setData({
        companyId: id,
        companyName: name
      });
      wx.navigateBack({
        delta: 1
      });
    }
  },
  lower: function(e) {
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
   * 页面相关事件处理函数--监听企业下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 企业点击右上角分享
   */
  onShareAppMessage: function() {

  }
})