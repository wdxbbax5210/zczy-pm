// pages/user/approve/list/index.js
import util from "../../../../utils/util.js";
import dataMap from "../../../../utils/dataMap.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userType: 0, //用户类型  0未审核 1普通用户 7普通员工  8管理员 9超级管理员 默认显示待审核列表
    userInfo: wx.getStorageSync("userInfo"),
    page: 1,
    pageSize: 10,
    count: 0,
    myUserType: null,
    buttons: {
      // 7普通员工  8管理员 9超级管理员
      7: [{
        key: -1,
        name: '拒绝审核'
      }, {
        key: 1,
        name: '设置为用户'
      }],
      8: [{
        key: -1,
        name: '拒绝审核'
      }, {
        key: 1,
        name: '设置为用户'
      }, {
        key: 7,
        name: '设置为员工'
      }],
      9: [{
        key: -1,
        name: '拒绝审核'
      }, {
        key: 1,
        name: '设置为用户'
      }, {
        key: 7,
        name: '设置为员工'
      }, {
        key: 8,
        name: '设置为管理'
      }]
    },
    buttonByUserType: null,
    editButtons: {
      // 7普通员工  8管理员 9超级管理员
      7: [{
        id: "make_company",
        name: "指定租户企业"
      }],
      8: [{
        id: "make_company",
        name: "指定租户企业"
      }],
      9: [{
        id: "edit",
        name: "编辑"
      }, {
        id: "make_company",
        name: "指定租户企业"
      }]
    },
    edit: null,
    ifShowToast: false
  },
  onChangeTab(event) {
    let tab = event.target.dataset.active;
    this.setData({
      userType: tab,
    }, () => {
      this.queryUserList();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util.setTitle("用户审核");
    // this.getUser();
    let userType = this.data.userInfo.userType;
    console.log(userType, "我的身份");
    let buttonByUserType = this.data.buttons[userType];
    console.log(buttonByUserType, "我的按钮");
    let edit = this.data.editButtons[userType];
    console.log(edit, "我的编辑按钮");
    this.queryUserList();
    this.setData({
      myUserType: parseInt(userType),
      buttonByUserType: buttonByUserType,
      edit: edit
    })
  },
  queryUserList: function() {
    let params = {
      userType: this.data.userType, //查询的用户类型列表
      nickName: null, //昵称
      unitNumber: null, //单元编号
      phoneNumber: null, //手机号码
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/user/list',
      params: params,
      success: (res) => {
        console.log(res.data, "用户列表")
        let _list = res.data.list || [];
        if (params.page > 1) {
          _list = t.data.list.concat(res.data.list)
        }
        this.setData({
          list: _list,
          count: res.data.count
        })
      }
    })
  },
  lower() {
    if (this.data.page * this.data.pageSize < this.data.count) {
      console.log("到底了！请求下一页")
      this.setData({
        page: this.data.page + 1
      }, () => {
        this.queryUserList();
      })
    } else {
      console.log("没有数据了")
    }
  },
  /**
   * 设置用户身份
   */
  userVerify: function(event) {
    let value = event.detail.value;
    let buttonByUserType = this.data.buttonByUserType;
    let userType = buttonByUserType[value];
    let userId = event.target.dataset.id;
    console.log(userId, "要设置身份的用户ID");
    console.log(userType, "要设置身份的用户身份");
    let params = {
      userId: userId,
      userType: userType.key
    }
    util.NetRequest({
      url: '/user/verify',
      params: params,
      success: (data) => {
        console.log(data.data, "用户verify")
        this.queryUserList();
      }
    })
  },
  userAction: function(event) {
    console.log(event);
    let value = event.detail.value;
    let edit = this.data.edit;
    let editButton = edit[value];
    if (null == editButton) {
      console.log("没有选中任何选项");
      return;
    }
    let option = editButton.id;
    let userId = event.target.dataset.id;
    let _item = event.target.dataset.item;
    if (option == 'edit') {
      console.log("选择了跳转编辑页面");
      this.redirectToEdit(userId, _item);
    }
    if (option == 'make_company') {
      console.log("选择了跳转指定租户企业页面");
    }
  },
  redirectToEdit: function(userId, _item) {
    let myUserType = this.data.userInfo.userType;
    console.log(myUserType, "只有超级管理员才可编辑");
    if (myUserType != 9) {
      this.setData({
        ifShowToast: true
      });
      setTimeout(() => {
        this.setData({
          ifShowToast: false
        })
      }, 1000);
      return;
    }
    wx.navigateTo({
      url: '../user/edit/index?from=approve&userId=' + userId + '&phoneNumber=' + _item.phoneNumber,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  showPopup(event) {
    let dataset = event.target.dataset;
    console.log(dataset);
    let item = dataset.item;
    if (null == item) {
      console.log("item不存在");
      return;
    }
    // 用户类型  0未审核 1普通用户 7普通员工  8管理员 9超级管理员 默认显示待审核列表
    let userType = item.userType;
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.show();
  },
  hidePopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.hide();
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