const { cloud } = getApp();
var app = getApp();

Page({
  data: {
    value: '',
    number: 0,
    userInfo: [],
    showView: true,
    selectilall: false,
    page: 1,
    pageSize: 6,
    hasMoreData: true,
    contentlist: [],
    productList: [],
    productTotal: 0,
    default: '../../image/arrow-right.png',
    img: '../../image/arrow-down.png',
    arr: [],
    tabs: [
      { title: '销售中' },
      { title: '审核中' },
      { title: '草稿箱' },
    ],
    dropDownMenuTitle: ['', '产品类型', '产品分层', '产品分组'],
    data2: [{
      id: 0,
      title: "全部"
    }, {
      id: 1,
      title: "直接下单品-RTS"
    }, {
      id: 2,
      title: "直接下单品-非RTS"
    }, {
      id: 3,
      title: "非直接下单品"
    }],
    data3: [{
      id: 0,
      title: "全部"
    }, {
      id: 1,
      title: "实力优品"
    }, {
      id: 2,
      title: "普通商品"
    }, {
      id: 3,
      title: "低质商品"
    }],
    data4: [{
      id: 0,
      title: "全部"
    }, {
      id: 1,
      title: "分组1"
    }, {
      id: 2,
      title: "分组2"
    }, {
      id: 3,
      title: "分组3"
    }
    ],
    //数组
    list: [],
    activeTab: 0,
  },
  //组件接收后返回
  SelectedItem: function (e) {
    var self = this
    var nowLi = self.data.list
    let newList = [];
    const { index, selectedId, selectedTitle } = e
    self.select[index - 1] = selectedId
    console.log(self.select)
    for (let i in nowLi) {
      if ((nowLi[i].data2id == self.select['0'] || self.select['0'] == 0) && (nowLi[i].data3id == self.select['1'] || self.select['1'] == 0) && (nowLi[i].group == self.select['2'] || self.select['2'] == 0)) {
        newList.push(nowLi[i])
      }
    }
    self.setData({
      lister: newList
    })
  },
  onShow() {
    this.select = [0, 0, 0]
  },

  onReset() { },
  onChange(e) { console.log(e); },
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
  //点击展示下架、删除
  showToggle: function (e) {
    var list1 = this.data.productList;
    var tabs = this.data.tabs
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        console.log("进入审核")
        list1 = this.data.list2;
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        list1 = this.data.lister1;
      }
    }
    for (let item in list1) {
      //如果当前点击的对象id和循环对象里的id一致
      if (e.target.dataset.index == item) {
        let nowShow = list1[item].isShow;
        //判断当前对象中的isShow是否为false（false为显示，其他为隐藏） 
        list1[e.target.dataset.index].isShow = !nowShow
      }
    }
    for (var j in tabs) {
      if (tabs[j].title == '审核中' && activeTab == 1) {
        this.setData({
          list2: list1
        })
      } else if (tabs[j].title == '草稿箱' && activeTab == 2) {
        this.setData({
          lister1: list1
        })
      } else {
        this.setData({
          productList: list1
        })
      }
    }
  },
  //全选，取消全选
  selectAll: function (e) {
    let arr = this.data.arr;
    let lister = this.data.productList;
    let selectilall = this.data.selectilall;
    if (selectilall == false) {
      for (let i = 0; i < lister.length; i++) {
        let newli = 'productList[' + i + '].checked';
        arr[i] = lister[i];
        //carts[i].selected = this.data.selectedAllStatus;
        //this.data.select.push(this.data.list[i].id);
        this.setData({
          //[newli]: !this.data.list[i].checked
          [newli]: true,
          selectilall: true,
          number: lister.length,
        })
      }
    }
    else {
      for (let i = 0; i < lister.length; i++) {
        let newli = 'productList[' + i + '].checked';
        arr.splice(arr[i], 1)
        //carts[i].selected = this.data.selectedAllStatus;
        //this.data.select.push(this.data.list[i].id);
        this.setData({
          //[newli]: !this.data.list[i].checked
          [newli]: false,
          selectilall: false,
          number: 0,
          arr: arr
        })
      }
    }
    // let number=list.length
    //console.log(list);
    console.log(arr)
  },
  //点击取消，把所有的checked改为false
  //取消选择
  selectAny: function (e) {
    let lister = this.data.productList;
    let selectilall = this.data.selectilall;
    for (let i = 0; i < lister.length; i++) {
      let newli = 'productList[' + i + '].checked';
      //carts[i].selected = this.data.selectedAllStatus;
      //this.data.select.push(this.data.list[i].id);
      this.setData({
        //[newli]: !this.data.list[i].checked
        [newli]: false,
        number: 0,
        selectilall: false,
      })
    }
    // let number=list.length
    //console.log(list);
  },
  //单选
  select1: function (e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let list = this.data.productList
    let newli = 'productList[' + index + '].checked';
    let xuanze = this.data.productList[index].checked;
    let number1 = this.data.number;
    let arr = this.data.arr;
    //勾选的数目
    if (!xuanze) {
      number1++;
      arr.push(this.data.productList[index])
    } else {
      number1--;
      arr.splice(this.data.productList[index], 1)
    }
    //确定按钮功能分析：1.建立零时数组，存放被选中的对象；2.把数组传递给诊断页面
    //  console.log(arr)
    this.setData({
      [newli]: !xuanze,
      // if ([newli]) {
      //   let number1="0"
      //   number1++
      // },
      number: number1
    })
    console.log(arr)
  },
  //确定按钮，提交参数
  queding() {
    let arr = this.data.arr;
    console.log("进入了确定方法")
    //console.log(arr)
    const arrList = JSON.stringify(arr);
    if (arr.length > 0) {
      console.log(arr.length)
      my.redirectTo({
        url: 'xiufu2/xiufu2?arrList=' + arrList
      });
      // console.log(arr)
      // return arr;
    } else {
      my.alert({
        title: '请选择要诊断产品'
      });
    }
  },
  //点击诊断按钮，提交参数category_id(类目ID)
  ZhenDuan(e) {
    //console.log(e)
    var arrNow = e.target.dataset.arry;
    //console.log(arrNow)
    app.globalData.oneProduct = arrNow;
    var alibaba_product_id = e.target.dataset.alibaba_product_id;
    var category_id = e.target.dataset.category_id;
    my.redirectTo({
      url: 'xiufu/xiufu?category_id=' + category_id
    })
    // this.setData({
    //   category_id:category_id,
    //   alibaba_product_id:alibaba_product_id,
    // })
    console.log(category_id)
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
    var that = this;
    that.autoInit();
    var activeT = app.globalData.activeT;
    if (activeT == undefined) {
      this.setData({
        activeTab: 0
      })
    } else {
      this.setData({
        activeTab: activeT,
        lister: this.data.list
      })
    }
    this.getAliGroupList();
  },
  //初始化数组
  autoInit() {
    var list = this.data.list;
    this.setData({
      lister: list,
      list2: list
    })
  },
  //获取商品
  onReady() {
    //this.getAliGroupList();
    this.getApprovalProductList();
  },
  //获取销售中低质产品
  async getApprovalProductList() {
    console.log("----------");
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.yes.product",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 1,
            "limit": 10,
            "status[]": 8
          }
        },
        'exts': { "timeout": 10000 }
      });
      for (let key in result.data.list) {
        result.data.list[key].isShow = true;
        result.data.list[key].checked = false;
        w: for (const key2 in this.data4) {
          if (result.data.list[key].group_id == this.data4[key2].id) {
            result.data.list[key].group_name = this.data4[key2].title;
            break w;
          }
        }
      }
      if (this.productList) {
        for (let key2 in this.productList) {
          result.data.list.push(this.productList[key2]);
        }
      }
      this.setData({
        productList: result.data.list,
        productTotal: result.data.count
      });
      console.log(result.data.list);
    } catch (e) {
      console.log(e);
    }
  },
  //获取分组信息
  async getAliGroupList() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/ali.product.group",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "parentId": -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      let newGroupList = [{ id: 0, title: "全部" }];
      if (result.data) {
        for (const key in result.data) {
          let obj = {
            id: result.data[key].group_id,
            title: result.data[key].group_name
          };
          newGroupList.push(obj);
        }
      }
      this.setData({
        data4: newGroupList,
      });
    } catch (e) {
    }
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    });
  },
  search(value) {
    console.log("进入搜索");
    console.log(value)
    var nowLister = this.data.list
    var newLister = [];
    var tabs = this.data.tabs
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        list1 = this.data.list2;
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        list1 = this.data.lister1;
      }
    }
    for (var cx in nowLister) {
      if (nowLister[cx].title.indexOf(value) != -1) {
        var n = nowLister[cx].title.indexOf(value)
        newLister.push(nowLister[cx])
      }
    }
    if (value == "") {
      this.setData({
        lister: nowLister
      })
    } else {
      this.setData({
        lister: newLister
      })
    }
  },
  //获取销售中产品
  // async getApprovalProductList(){
  //   try {
  //     const result = await cloud.application.httpRequest({
  //       'path':'index.php',
  //       'method':'POST',
  //       'body':{
  //         "api":"/api/publish.yes.product",
  //         "method":"GET",
  //         "token":app.globalData.token,
  //         "data":{
  //           "page":this.pagenumber,
  //           "limit":10,
  //           "status":[8],
  //         }
  //       },
  //       'exts':{ "timeout":10000} 
  //     });
  //     for (let key in result.data.list) {
  //       result.data.list[key].isShow = true;
  //       w:for (const key2 in this.data4) {
  //         if (result.data.list[key].group_id == this.data4[key2].id) {
  //           result.data.list[key].group_name = this.data4[key2].title;
  //           break w;
  //         }
  //       }
  //     }
  //     if(this.productList){
  //       for (let key2 in this.productList) {
  //         result.data.list.push(this.productList[key2]);
  //       }
  //     }
  //     this.setData({
  //       productList:result.data.list,
  //       productTotal:result.data.count
  //     });
  //   } catch (e) {

  //   }
  // },
});
