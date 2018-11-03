// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showclass: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeTab: "feeStatus",
    statusArray: [{
      key: null,
      name: '全部'
    }, {
      key: 1,
      name: '已缴费'
    }, {
      key: 0,
      name: '未缴费'
    }],
    activeKey: null,
    date: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    resetFilter: function(){
      this.setData({
        activeKey: null,
        date: ''
      })
    },
    confirmFilter: function () {
      this.triggerEvent('confirmFilter', {
        activeKey: this.data.activeKey,
        date: this.data.date,
      })
      this.setData({
        activeTab: 'feeStatus'
      })
    },
    handleSelect: function(e){
      this.setData({
        activeTab: e.target.dataset.name
      })
    },
    changeStatus: function(e){
      this.setData({
        activeKey: e.target.dataset.key
      })
    },
    bindDateChange: function(e){
      console.log('月份选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    }
  }
})
