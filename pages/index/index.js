// pages/index/index.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        key: 1
      }
      // , {
      //   link: '/pages/logs/logs',
      //   url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      //   key: 2
      // }, {
      //   link: '/pages/test/test',
      //   url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      //   key: 3
      // }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: null,
    showFeeOwnerRecordIcon: true, // 是否显示费用查询按钮
    showFeeRecordManageIcon: false, // 是否显示费用录入按钮
    showItemManageIcon: false, // 是否显示收费项目管理按钮
    showCompanyManageIcon: false // 是否显示租户企业按钮
  },
  goQueryOperate: function () {
    let operateRight = '';
    let t = this;
    let userType = t.data.userInfo.userType;
    if (util.inArray(userType, ["7", "8", "9"])) {
      operateRight = '?operateRight=1';
    }
    wx.navigateTo({
      url: '../fee/record/list/index' + operateRight,
    })
  },
  goQuery: function () {
    wx.navigateTo({
      url: '../fee/record/owner/index',
    })
  },
  goToFeeList: function () {
    wx.navigateTo({
      url: '../fee/item/list/index',
    })
  },
  goToTenantList: function () {
    wx.navigateTo({
      url: '../company/list/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("首页");
    let t = this;
    wx.login({
      success: function (res) {
        console.log(res)
        util.hideLoading()
        if (res.code) {
          //调用/login/check 检查用户是否注册过
          let params = {
            code: res.code //必填 
          }
          util.NetRequest({
            url: '/user/login/check',
            params: params,
            success: (res) => {
              let userInfo = res.data.userInfo;
              // 用户类型：0、未知 1、普通用户 6、普通员工 7、维护员工 8、管理员 9、超级管理员
              let userType = (userInfo && !util.isEmptyObj(userInfo)) ? userInfo.userType : null;
              // 没有授权 引导用户授权登录 或者拒绝审核后
              if (null == userType || userType == -1) {
                getApp().globalData.openId = res.data.openId;
                getApp().globalData.sessionKey = res.data.sessionKey;
                if (null != userType && userType == -1) {
                  t.showDialog('.falid-user-type');
                  return;
                }
                t.showDialog('.unknow-user-type');
                return;
              }
              // 注册过
              getApp().globalData.header.Cookie = 'JSESSIONID=' + userInfo.sessionId;
              // 参数定义
              let showFeeOwnerRecordIcon = true, showFeeRecordManageIcon = false, 
                showItemManageIcon = false, showCompanyManageIcon = false; 
              // 是否显示费用查询按钮
              if (util.inArray(userType, ["6", "7", "8"])) {
                // 6、普通员工 7、维护员工 8、管理员的情况下不显示
                showFeeOwnerRecordIcon = false;
              }
              // 是否显示费用录入按钮
              // 是否显示收费项目管理按钮
              // 是否显示租户企业按钮
              if (util.inArray(userType, ["6", "7", "8", "9"])) {
                // 6、普通员工 7、维护员工 8、管理员 9、超级管理员的情况下显示
                showFeeRecordManageIcon = true;
                showItemManageIcon = true;
                showCompanyManageIcon = true;
              }
              t.setData({
                userInfo: userInfo,
                showFeeOwnerRecordIcon: showFeeOwnerRecordIcon,
                showFeeRecordManageIcon: showFeeRecordManageIcon,
                showItemManageIcon: showItemManageIcon,
                showCompanyManageIcon: showCompanyManageIcon
              })
            
              wx.setStorageSync("userInfo", userInfo)
              if (userType == "0") { //当前用户身份未知时跳转到等待页面
                wx.reLaunch({
                  url: '../user/access/index'
                })
              }
              console.log(res.data, "校验是否注册过")
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  showDialog(dialog) {
    // '.wxc-dialog'
    let dialogComponent = this.selectComponent(dialog);
    dialogComponent && dialogComponent.show();
  },
  hideDialog(dialog) {
    let dialogComponent = this.selectComponent(dialog);
    dialogComponent && dialogComponent.hide();
  },
  onCancel(dialog) {
    console.log('点击了取消按钮')
    this.hideDialog(dialog);
  },
  //确认授权
  onConfirm() {
    wx.navigateTo({
      url: '../register/register',
    })
    this.hideDialog();
  },
  upload() {
  
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