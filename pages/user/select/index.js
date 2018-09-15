// pages/user/select/index.js
import util from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [], //用户列表
    userName: null, //按照名字搜索
    page: 1,
    pageSize: 10,
    count: 0,
    itemId: null,
    canLower: true, //触底函数控制变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserList();
    console.log(options, "选人页面")
    this.setData({
      itemId: options.itemId
    })
  },
  //获取用户列表 跳转页面选人
  getUserList() {
    let t = this;
    let params = {
      userType: 1, //查询普通用户列表
      nickName: this.data.userName, //昵称
      unitNumber: null, //单元编号
      phoneNumber: null, //手机号码
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    t.setData({
      canLower: false, // 触底函数关闭
    });
    console.log(params)
    util.NetRequest({
      url: '/user/list',
      params: params,
      success: (res) => {
        console.log(res.data, "用户列表")
        let _list = res.data.list || [];
        if (params.page > 1) {
          _list = t.data.list.concat(res.data.list)
        }
        t.setData({
          canLower: true, //有新数据，触底函数开启，为下次触底调用做准备
          userList: _list,
          count: res.data.count
        })
      }
    })
  },
  lower() {
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
      this.getUserList();
    });
  },
  /**
   * 搜索用户
   */
  onNameChange(e) {
    this.setData({
      userName: e.detail.value || null
    }, () => {
      this.getUserList();
    })
  },
  /**
   * 选中某人返回上一页带上选中人的id
   */
  onSelectUser(e) {
    let t = this;
    wx.redirectTo({
      url: '../fee/record/add/index?id=' + e.target.dataset.id + "&name=" + e.target.dataset.name + "&itemId=" + this.data.itemId + "&from=selectuser",
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})