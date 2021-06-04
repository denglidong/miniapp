Page({
  data: {
    images: [],
    //产品属性
    array: [

      {
        id: 0,
        name: 'maijia',
        label: '工艺', //中文名称
        select_Type: "single_select",   //选择类型，单选
        select: 1, //select表示用户之前未选择或者填写
        options: ['手工'] //options表示对应的属性
      }, {
        id: 0,
        name: 'changhe',
        label: '适用场合',
        select_Type: "single_select",
        select: 1,
        options: ['结婚']
      },
      {
        id: 0,
        name: 'mubiao',
        label: '主要目标买家',
        select_Type: "single_select",
        select: 1,
        options: ['女人']
      },
      {
        id: 0,
        name: 'jiari',
        label: '假日',
        select_Type: "single_select",
        select: 1,
        options: ['六一']
      },
      {
        id: 0,
        name: 'remai',
        label: '热卖季节',
        select_Type: "single_select",
        select: 1,
        options: ['春']
      },
      {
        id: 0,
        name: 'yuanchandi',
        label: '原产地',
        select_Type: "single_select",
        select: 1,
        options: ['中国']
      },
      {
        id: 0,
        name: 'yuanchandi',
        label: '类型',
        select_Type: "single_select",
        select: 1,
        options: ['食品']
      },



    ],

    //产品规格
    arrayGG: [
      {
        id: 0,
        name: "color",
        labal: "颜色",
        select: 0,
        options: ["红色"]
      },

    ],
  },
  //退出
  showWindows1: function () {
    my.confirm({
      titke: "提示",
      content: "确定退出应用吗？",
      success(res) {
        if (res.confirm == true) {
          my.reLaunch; ({
            url: '../../optimization'
          });
        } else if (res.confirm == false) {
          console.log("取消")
        }
      }
    })
  },

  //应用按钮二次提示：提交
  showWindows2: function () {
    my.confirm({
      titke: "提示",
      content: "确定提交吗？",
      success(res) {
        if (res.confirm == true) {
          my.switchTab({
            url: '../../../product/product'
          });
        } else if (res.confirm == false) {
          console.log("取消")
        }
      }
    })
  },
  onLoad() { },
  clickItem: function (e) {
    console.log(e)
  }

});
