// pages/feeItemAdd/feeItemAdd.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName:null,
    itemId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      itemName: options.itemName || null,
      itemId: options.itemId || null
    })
  },
  OnNameChange(event) {
    this.setData({
      itemName: event.detail.value
    })
  },
  onConfirm: function(){
    if(this.data.itemId){
      this.feeItemUpdate();
    }else{
      this.feeItemAdd();
    }
  },
  feeItemAdd: function () {
    let params = {
      itemName: this.data.itemName //必填 
    }
    console.log("新增")
    let t = this;
    util.NetRequest({
      url: "/fee/item/add",
      params: params,
      success: (data) => {
        console.log(data.data, "新增收费项目")
        t.setData({
          itemName: null,
          itemId: null
        }, () => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    })
  },
  feeItemUpdate: function () {
    let t = this;
    let params = {
      itemName: this.data.itemName, //必填 
      itemId: this.data.itemId, //项目Id 必填
    }
    console.log("编辑")
    util.NetRequest({
      url: '/fee/item/upd',
      params: params,
      success: (data) => {
        console.log(data.data, "更新收费项目")
        t.setData({
          itemName: null,
          itemId: null
        }, () => {
          wx.navigateBack({
            delta: 1,
          })
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