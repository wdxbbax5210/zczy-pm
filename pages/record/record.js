// pages/record/record.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "", //选择的时间
    amount: "",
    type: "null", // 0是标记已缴费 1是标记已开票
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // options={
    //   amount: "200",  //缴费金额
    //   recordId:"1",  //记录id
    //   type:"0",  //编辑类型 标记为已缴费或标记为已开票
    // }
    this.setData({
      amount: options.amount || "",
      recordId: options.recordId,
      type: options.type || "",
    })
  },
  /**
   * 金额改变
   */
  onAmountChange(e){
    this.setData({
      amount: e.detail.value
    })
  },
  /**
   * 日期改变
   */
  onDateChange(e){
    console.log('月份选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 确认提交
   */
  onConfirm() {
    let t = this;
    if(this.data.type == "0"){
      this.recordPay()
    }else if(this.data.type == "1"){
      this.recordTicket()
    }
  },
 
  /**
   * 记录缴费
   */
  recordPay() {
    util.NetRequest({
      url: "/fee/record/pay",
      params: {
        recordId: this.data.recordId,   //记录id
        realPayFee: this.data.amount, //实际缴费金额
        payTime: this.data.date //缴费时间
      },
      success: (data) => {
        console.log(data)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 记录开票
   */
  recordTicket() {
    util.NetRequest({
      url: "/fee/record/ticket",
      params: {
        recordId: this.data.recordId,   //记录id
        payTime: this.data.date //开票时间
      },
      success: (data) => {
        console.log(data)
        wx.navigateBack({
          delta: 1
        })
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