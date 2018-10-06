// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showclass: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    a: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    resetFilter: function(){
      console.log("reset")
      this.triggerEvent('resetFilter')
    },
    confirmFilter: function () {
      console.log("confirm")
      this.triggerEvent('confirmFilter', this.data.a)
    }
  }
})
