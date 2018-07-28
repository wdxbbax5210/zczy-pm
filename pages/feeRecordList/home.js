import util from "../../utils/util.js";
// 仅限查询数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tabs: [],
    tabIndex: 0,
    tabSelected: 0,
    selected: 0,
    index: 0,
    array: [{ key: null, name: '缴费状态' }, { key: 1, name: '已缴费' }, { key: 0, name: '未缴费' }],
    date: '',
    list: [],
    operateRight: null,
    status: ["缴费", "开票", "编辑", "删除"],
    selectedStatus: 0,
    page: 1,
    pageSize: 10,
    count: 0,
  },
  /**
   * 切换月份
   */
  bindDateChange: function (e) {
    console.log('月份选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    }, () => {
      this.onQueryDetailList();
    })
  },
  lower: function (e) {
    if (this.data.page * this.data.pageSize < this.data.count) {
      console.log("到底了！请求下一页")
      this.setData({
        page: this.data.page + 1
      }, () => {
        this.onQueryDetailList();
      })
    } else {
      console.log("没有数据了")
    }
  },
  /**
   * 选择缴费状态
   */
  bindPickerChange: function (e) {
    console.log('缴费状态选择改变，携带值为', e.detail.value)
    this.setData({
      selected: e.detail.value
    }, () => {
      this.onQueryDetailList();
    })
  },
  /**
   * 选择收费项目
   */
  bindItemChange: function (e) {
    console.log('收费项目改变，携带值为', e.detail.value)
    this.setData({
      tabSelected: e.detail.value
    }, () => {
      this.onQueryDetailList();
    })
  },
  /**
   * 切换收费项目
   */
  onClick: function (e) {
    this.setData({
      date: "",
      index: e.detail.key,
      page: 1,
      count: 0
    }, () => {
      this.onQueryDetailList();
    })
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("费用查询");
    console.log(options.operateRight)
    if (options.operateRight) {
      this.setData({
        operateRight: options.operateRight
      })
      util.setTitle("费用录入");
    }
    let _userInfo = wx.getStorageSync("userInfo").data
    if (_userInfo) {
      this.setData({
        userInfo: _userInfo
      })
    }
  },
  /**
   * 操作 标记为已开票 标记为 已缴费
   */
  bindhandleChange(e) {
    // console.log('缴费状态或者开票状态改变，携带值为', e.detail.value)
    this.setData({
      selectedStatus: e.detail.value
    }, () => {
      //刷新列表状态
      let id = e.target.dataset.id;
      let amount = e.target.dataset.amount;
      if (e.detail.value == 0 || e.detail.value == 1) {
        wx.navigateTo({
          url: '../record/record?recordId=' + id + '&amount=' + amount + '&type=' + e.detail.value,
        })
      } else if (e.detail.value == 3) { //删除该条记录
        this.delFeeItem(id);
      } else if (e.detail.value == 2) {
        console.log("编辑去")
        console.log(e.target.dataset)
        wx.navigateTo({
          url: '../addFeeRecord/addFeeRecord?item=' + JSON.stringify(e.target.dataset.item),
        })
      }
    })
  },
  /**
   * 删除该条收费记录
   */
  delFeeItem(recordId) {
    util.NetRequest({
      url: '/fee/record/del',
      params: {
        recordId: recordId
      },
      success: (data) => {
        this.onQueryDetailList()
      }
    })
  },
  /**
   * 获取收费项目列表 赋值给tabs
   */
  getFeeList() {
    let params = {
      itemName: null, //非必填
      page: 1,
      pageSize: 99
    }
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (res) => {
        this.setData({
          tabs: res.data.list,
        }, () => {
          this.onQueryDetailList()
        })
        console.log(res.data, "收费项目列表")
      }
    })
  },
  /**
   * 查询对应收费项目的详情列表 赋值给list
   */
  onQueryDetailList() {
    let t = this, { tabs, selected, userInfo, date, index, array, tabIndex, tabSelected } = t.data;
    let url = this.data.operateRight == 1 ? "/fee/record/list" : "/fee/record/owner/list";
    let tab = null == tabs ? null : (tabs[tabSelected] || null);
    let itemName = null == tab ? null : tab.itemName;
    let pay = array[selected] || null;
    let payStatus = null == pay ? null : (pay.key || null);
    let params = {
      itemName: itemName || null,
      nickName: userInfo.nickName || null,
      unitNumber: userInfo.unitNumber || null,
      phoneNumber: userInfo.phoneNumber || null,
      theMonth: date || null,
      payStatus: payStatus,
      payTimeFrom: null, //缴费时间
      payTimeTo: null,
      ticketTimeFrom: null, //开票时间
      ticketTimeTo: null,
      page: this.data.page,
      pageSize: this.data.pageSize
    };
    console.log('请求列表参数为：', params);
    util.NetRequest({
      url: url,
      params: params,
      success: (res) => {
        let _list = res.data.list || [];
        if (t.data.page > 1 && res.data.list) {
          _list = t.data.list.concat(res.data.list)
        }
        this.setData({
          list: _list,
          count: res.data.count
        })
      }
    })
  },
  /**
   * 新增收费记录
   */
  onAddRecord() {
    let t = this, { tabs, selected, userInfo, date, index, array, tabIndex, tabSelected } = t.data;
    let tab = null == tabs ? null : (tabs[tabSelected] || null);
    let itemId = null == tab ? null : tab.id;
    console.log('跳转页面带参数ItemId', itemId);
    wx.navigateTo({
      url: '../addFeeRecord/addFeeRecord?itemId=' + itemId,
    })
    /**
  * 添加记录
  */
    // addRecord(){
    //   util.NetRequest({
    //     url: '/fee/record/add',
    //     params: {
    //       userId: "",
    //       itemId: "", //收费项目id
    //       theMonth: this.data.date, //所属月份
    //       planPayFee: this.data.amount //应收金额
    //     },
    //     success: (data) => {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     }
    //   })
    // },
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
    this.getFeeList();
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