// pages/setPassword/setPassword.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: null,
    message:"信息填写不完整",
    $toast: {
      show: false
    },
    userInfo: wx.getStorageSync("userInfo"),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("设置密码");
  },
  onPhoneChange: function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  onPasswordChange: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  setPassword: function(){
    // console.log(this.data)
    let userInfo = this.data.userInfo;
    // console.log(userInfo)
    if(!this.data.password){
      this.showToast('请输入密码！');
      console.log("请输入密码")
      return 
    }else{
      var reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
      if (!reg.test(this.data.password)) {
        this.showToast('密码格式错误');
        return
      }
    }
    let params = {
      userId: userInfo.id,
      password: this.data.password
    }
    util.NetRequest({
      url: "/user/password",
      params: params,
      success: (res) => {
        console.log(res)
        if (res.result == "313") {
          this.showToast(res.data.message)
        } else {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  /**
   * 提示
   */
  showToast(msg) {
    this.setData({ message: msg, $toast: { show: true } });
    setTimeout(() => {
      this.setData({ message: null, $toast: { show: false } });
    }, 1000)
  },
  btnConfirm() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
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