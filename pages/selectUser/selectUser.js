// pages/selectUser/selectUser.js

import util from "../../utils/util.js"; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [], //用户列表
    userName: null, //按照名字搜索
    page:1,
    pageSize: 10,
    count:0,
    itemId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList();
    console.log(options,"选人页面")
    this.setData({
      itemId: options.itemId
    })
  },
//获取用户列表 跳转页面选人
  getUserList(){
    let t = this;
    let params = {
      userType: 1, //查询普通用户列表
      nickName: this.data.userName,  //昵称
      unitNumber: null, //单元编号
      phoneNumber: null, //手机号码
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    console.log(params)
    util.NetRequest({
      url: '/user/list',
      params: params,
      success: (res) => {
        console.log(res.data, "用户列表")
        this.setData({
          userList: res.data.list || [],
          count: res.data.count
        })
      }
    })
  },
  /**
   * 搜索用户
   */
  onNameChange(e){
    this.setData({
      userName: e.detail.value || null
    },()=>{
      this.getUserList();
    })
  },
  /**
   * 选中某人返回上一页带上选中人的id
   */
  onSelectUser(e){
    let t = this;
    wx.redirectTo({
      url: '../addFeeRecord/addFeeRecord?id=' + e.target.dataset.id + "&name=" + e.target.dataset.name+"&itemId="+this.data.itemId+"&from=selectuser",
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