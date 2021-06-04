Component({
  properties: {
    dropDownMenuTitle: {
      type: Array,
      value: [],
    },
    dropDownMenuSourceData: {
      type: Array,
      value: []
    },
    dropDownMenuStyleData: {
      type: Array,
      value: []
    },
    dropDownMenuFilterData: {
      type: Array,
      value: []
    },
  },
  data: {
    // private properity
    source_open: false, // 来源
    style_open: false, // 出租 出售
    filteropen: false, // 筛选
    shownavindex: '',
    selected_style_id: 0,
    selected_style_name: '',
    selected_source_id: 0,
    selected_source_name: '',
    selected_filter_id: 0,
    selected_filter_name: ''
  },
  methods: {
    tapSourceNav: function (e) {
      console.log(e)
      if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: true,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    },
    tapStyleNav: function (e) {
      if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: true,
          filter_open: false,
          district_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
      console.log(e.target)
    },
    tapFilterNav: function (e) {
      if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: true,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    },

    selectSourceItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_source_id: selectedId,
        selected_source_name: selectedTitle
      })
      this.props.onSelectedItem({
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle,
      })
    },

    selectFilterItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_filter_id: selectedId,
        selected_filter_name: selectedTitle
      })
      this.props.onSelectedItem({
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    selectStyleItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_style_id: selectedId,
        selected_style_name: selectedTitle
      })
      this.props.onSelectedItem({
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    /**关闭筛选 */
    closeHyFilter: function () {
      if (this.data.district_open) {
        this.setData({
          district_open: false,
          source_open: false,
          style_open: false,
          filter_open: false,
        })
      } else if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      } else if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      } else if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      }
    },
  },
  //组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () {


  },

})