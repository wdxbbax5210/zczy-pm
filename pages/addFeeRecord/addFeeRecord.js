// pages/addFeeRecord/addFeeRecord.js

import util from "../../utils/util.js";
Page({
  // 新增或编辑某个收费项目下的收费记录  
  /**
   * 页面的初始数据
   */
  data: {
    amount: "",     //应收金额
    date: "",       //所属月份
    unitNumber: "", //单元编号
    itemId: null,   //收费项目Id
    userId: null,   //用户id
    userName: "", //选中的用户昵称
    $toast: {
      show: false
    },
    userInfo: wx.getStorageSync("userInfo"),
    userList: [], //可选的用户列表
    message:"", //保存失败后的提示语
    backNumber: 1, //向上返回的层级数
    recordId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item && JSON.parse(options.item) && !util.isEmptyObj(JSON.parse(options.item))){
      let _item = JSON.parse(options.item);
      this.setData({
        amount: _item.planPayFee,     //应收金额
        date: _item.theMonth,       //所属月份
        unitNumber: _item.unitNumber || null, //单元编号
        itemId: _item.itemId,   //收费项目Id
        userId: _item.userId,   //用户id
        userName: _item.nickName, //选中的用户昵称
        recordId: _item.id  //记录id
      })
    }
    if(options.id){
      this.setData({
        userId: options.id,
        userName: options.name
      })
    }
    if (options.itemId){
      this.setData({
        itemId: options.itemId
      })
    }
    /**
     * 从选人页面回来 需要将后退页码改为2 才会退回到列表页
     */
    if(options.from == "selectuser"){
        this.setData({
          backNumber: 2
        })
    }
    if (this.data.recordId) {
      util.setTitle("编辑记录")
    } else {
      util.setTitle("新增记录")
    }
  },
  onSelectUser(){
    wx.navigateTo({
      url: '../selectUser/selectUser?itemId=' + this.data.itemId,
    })
  },
  onUnitChange(e){
    this.setData({
      unitNumber: e.detail.value
    })
  },
  onAmountChange(e){
    this.setData({
      amount: e.detail.value
    })
  },
  /**
   * 日期改变
   */
  onDateChange(e) {
    console.log('日期选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 新增/编辑保存
   */
  onConfirm(){
    let t = this;
    if (!this.data.amount){
      this.showToast('应收金额必须输入！');
      return;
    }
    if (!this.data.date) {
      this.showToast('所属月份必须选择！');
      return;
    }
    if (!this.data.userId) {
      this.showToast('请选择用户！');
      return;
    }
    if (!this.data.unitNumber) {
      this.showToast('该用户还没有单元编号，请先去填写！');
      return;
    }
    let params = {
      userId: this.data.userId, 
      planPayFee: this.data.amount || null,  
      itemId: this.data.itemId || null, 
      theMonth: this.data.date || null,
      recordId: this.data.recordId || null
    }
    
    let url = '/fee/record/add';
    if (params.recordId) {
      url ='/fee/record/upd'
    }
    util.NetRequest({
      url: url,
      params: params,
      success: (res) => {
        console.log(res)
        if(res.result == "313"){
          t.setData({
            message: res.message
          },()=>{
            let dialogComponent = t.selectComponent('.wxc-dialog')
            dialogComponent && dialogComponent.show();
          })
        }else{
          wx.navigateBack({
            delta: t.data.backNumber
          })
        }
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  },
  btnConfirm() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  /**
   * 提示
   */
  showToast(msg) {
    this.setData({message: msg, $toast: { show: true } });
    setTimeout(() => {
      this.setData({message: null, $toast: { show: false }});
    }, 1000)
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