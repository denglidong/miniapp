Page({
  data: {
    value:'',
    userInfo:[],


    isCollect: false, // 默认没有选中

    // 点击勾选
    toCollect() {
    var bol = this.data.isCollect; // 获取状态
      this.setData({
      isCollect:!bol // 改变状态
      })
    },

    tabs:[
      {title:'诊断中(999+)'},
      {title:'诊断完成(999+)'},
    ],
   list:[{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah",
      time:"2021/01/14"
      },
      {
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah",
       time:"2021/01/14"
      },
      {
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah",
       time:"2021/01/14"
}],
 FNlist:[{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
      },{
      image:"https://pic.maimiao.icu/erp/20210119/202101191513383954.png",
      title:"Stainless",
      id:"1600150514167",
      state:"直接下单品|潜力商品",
      group:"hookah"
}],
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
    activeTab: 0,
  },
  zhenDuan(){
    my.alert({
          content: '正在努力诊断',
        });
  },
  dianji(e){
  console.log(e.currentTarget.dataset.index)
  },
   changstyle:function(e){
   let index=e.currentTarget.dataset.index;
   
   this.setData({
     TopIndex:index
   })
 },
 shaixuan:function(){
 var hid=this.data.hidden;
    if(hid==true){
      hid=false;
    }
    else{
      hid=true;
    }
     this.setData({
        hidden: hid // 改变状态
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
  handleInput(value){
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
