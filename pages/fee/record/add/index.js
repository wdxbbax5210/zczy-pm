// pages/fee/record/add/index.js

import util from "../../../../utils/util.js";
Page({
  // 新增或编辑某个收费项目下的收费记录  
  /**
   * 页面的初始数据
   */
  data: {
    amount: "",     //应收金额
    date: "",       //所属月份
    unitNumber: "", //单元编号
    selectItem: null,
    itemId: null,   //收费项目Id
    itemName: null, //收费项目名称
    companyId: null,   //企业id
    companyName: "", //选中的企业昵称
    $toast: {
      show: false
    },
    userInfo: wx.getStorageSync("userInfo"),
    userList: [], //可选的用户列表
    message: "", //保存失败后的提示语
    backNumber: 1, //向上返回的层级数
    recordId: null,
    editMode: null,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFeeItemList();
    let editMode = options.editMode;
    if (editMode == 'add') {
      util.setTitle("新增记录");
    }
    if (editMode == 'upd') {
      util.setTitle("编辑记录");
      let item = options.item;
      if (util.isEmptyString(item)) {
        this.showToast('要编辑的数据不存在！', () => {
          wx.navigateBack({ delta: 1 });
        });
      }
      let _item = JSON.parse(item);
      if (util.isEmptyObj(_item)) {
        this.showToast('要编辑的数据不存在！', ()=> {
          wx.navigateBack({ delta: 1 });
        });
      }
      console.log("编辑记录携带值", _item);
      this.setData({
        amount: _item.planPayFee,     //应收金额
        date: _item.theMonth,       //所属月份
        unitNumber: _item.unitNumber || null, //单元编号
        itemId: _item.itemId,   //收费项目Id
        itemName: _item.itemName,
        companyId: _item.companyId,   //用户id
        companyName: _item.companyName, //选中的用户昵称
        recordId: _item.id  //记录id
      })
    }
  },
  /**
   * 获取收费项目列表
   */
  getFeeItemList() {
    let params = {
      itemName: null, //非必填
      page: 1,
      pageSize: 99
    }
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (res) => {
        console.log(res.data)
        this.setData({
          items: res.data.list || [],
        })
      }
    })
  },
  /**
   * 选择收费项目
   */
  bindItemChange: function (e) {
    let selectItem = e.detail.value;
    let items = this.data.items;
    let item = items[selectItem];
    console.log('收费项目改变，携带值为', selectItem)
    console.log('收费项目改变，选择值为', item)
    this.setData({
      selectItem: selectItem,
      itemId: item.id,
      itemName: item.itemName
    })
  },
  onSelectCompany() {
    wx.navigateTo({
      url: '../../../company/select/index?pageFrom=fee_record_add',
    })
  },
  onUnitChange(e) {
    this.setData({
      unitNumber: e.detail.value
    })
  },
  onAmountChange(e) {
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
  onConfirm() {
    let t = this;
    if (!this.data.amount) {
      this.showToast('应收金额必须输入！');
      return;
    }
    if (!this.data.date) {
      this.showToast('所属月份必须选择！');
      return;
    }
    if (!this.data.companyId) {
      this.showToast('请选择企业！');
      return;
    }
    if (!this.data.itemId) {
      this.showToast('请选择收费项目！');
      return;
    }
    if (!this.data.unitNumber) {
      this.showToast('该企业还没有单元编号，请先去填写！');
      return;
    }
    let params = {
      companyId: this.data.companyId,
      planPayFee: this.data.amount || null,
      itemId: this.data.itemId || null,
      theMonth: this.data.date || null,
      recordId: this.data.recordId || null
    }
    util.showLoading('正在保存');
    let url = '/fee/record/add';
    if (params.recordId) {
      url = '/fee/record/upd'
    }
    util.NetRequest({
      url: url,
      params: params,
      success: (res) => {
        util.hideLoading();
        console.log(res)
        if (res.result == "313") {
          t.setData({
            message: res.message
          }, () => {
            let dialogComponent = t.selectComponent('.wxc-dialog')
            dialogComponent && dialogComponent.show();
          })
        } else {
          wx.redirectTo({
            url: '../list/index' 
          });
        }
      },
      fail: (err) => {
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
  showToast(msg, callback) {
    this.setData({ message: msg, $toast: { show: true } });
    setTimeout(() => {
      this.setData({ message: null, $toast: { show: false } }, ()=> {
        if (callback) {
          callback();
        }
      });
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