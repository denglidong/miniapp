Page({
  data: {
    value: '',
    userInfo: [],
    tabs: [
      { title: '诊断中(999+)' },
      { title: '诊断完成(999+)' },

    ],
    list: [],
    FNlist: [],
    Tubiao: {
      iconSize: [20, 30, 40, 50, 60],
      iconColor: [
        'red', 'yellow', 'blue', 'green',
      ],
      iconType: [
        'success',
        'info',
        'warn',
        'waiting',
        'clear',
        'success_no_circle',
        'download',
        'cancel',
        'search',
      ],
    },
    activeTab: 1,
  },
  zhenDuan() {
    my.alert({
      content: '正在努力诊断',
    });
  },
  dianji(e) {
    console.log(e.currentTarget.dataset.index)
  },
  changstyle: function (e) {
    let index = e.currentTarget.dataset.index;

    this.setData({
      TopIndex: index
    })
  },
  onLoad() {
    /*my.getAuthCode({
      scopes: 'auth_user',
      success: (result) => {
        my.alert({
          content: result,
        });
      },
    });*/
    /*my.authorize({
      scopes: 'scope.userInfo',
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });*/
  },
  handleInput(value) {
    this.setData({
      value,
    })
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
});
