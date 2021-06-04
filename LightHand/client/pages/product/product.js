const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    modalOpened21: false,
    showMaskTap: false,//蒙层是否显示
    scrolltopNum: 0,//页面顶部
    //refTime: '',//同步倒计时
    SYNCInfo: '',//同步信息
    SYNCTime: '',//同步商品时间
    // popover组件开始
    position: "leftBottom",
    show: false,
    showMask: true,
    // popover组件结束
    topNum: 10,//设置定位位置
    topNum1: 17,
    topNum2: 25,
    topNum3: 32,
    bgHeight: 10,
    marginTop: 0,
    systemInfo: [],//手机信息
    auth_code: '',
    value: '',
    userInfo: [],
    lister: [],
    towards: '',//左右滑动参数
    default: '../../image/arrow-right.png',
    img: '../../image/arrow-down.png',
    status: 204,
    tabs: [
      { title: '销售中' },
      { title: '审核中' },
      { title: '草稿箱' },
      { title: '发布失败' },
    ],
    images: [
      { status: 204, img: '../../image/wuneirong.png', title: '无内容' },
      { status: 403, img: '../../image/403.png', title: '加载失败，请联系管理员' },
      { status: 408, img: '../../image/wuwangluo.png', title: '无网络，请联网后重试' }
    ],
    activeTab: 0,
    productList: [],
    productList2: [],
    productList3: [],
    productList4: [],
    productTotal: 0,
    productTotal2: 0,
    productTotal3: 0,
    productTotal4: 0,
    list: [],
    list2: [],
    list3: [],
    list4: [],
    productId: [],
    dropDownMenuTitle: ['', '产品类型', '产品分层', '产品分组'],
    data2: [
      { id: 0, title: "全部", en_name: "all" },
      { id: 1, title: "直接下单品", en_name: "wholesale" },
      { id: 2, title: "非直接下单品", en_name: "sourcing" },
    ],
    data3: [
      { id: 0, title: "全部" },
      { id: 1, title: "实力优品" },
      { id: 2, title: "普通商品" },
      { id: 3, title: "低质商品" }
    ],
    //分组信息
    data4: [],
    pagenumber: 1,//初始页默认值为1
    onShowLoading: true,
  },
  onReady() {
    this.getApprovalProductList();
    this.getAppReviewProductList();
    this.getAppDraftProductList();
    this.getAppFailedProductList();
  },
  //获取发布模板
  async getProductList() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.tpl",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 1,
            "limit": 6
          }
        },
        'exts': { "timeout": 10000 }
      });
      // 
      if (JSON.stringify(result) == '{}') {
        my.hideLoading();
        my.showToast({
          content: '服务器繁忙,请联系客服人员',
          duration: 4000,
          success: () => {
            this.setData({
              showMaskTap: false
            })
          }
        })
      } else {
        if (result.data.list.length > 2) {
          my.showToast({
            content: '正在进入拍照发品...',
            duration: 2000,
          })
          my.navigateTo({
            url: "/pages/publishProduct/publishProduct",
          })
          app.globalData.activeIndex = 1
        } else {
          this.setData({
            show: !this.data.show,
          })
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  // popover组件开始
  onShowPopoverTap() {
    // my.showToast({
    //   content: '拍照发品准备中...',
    //   duration: 3000,
    // })
    this.getProductList();
  },
  onMaskClick() {
    this.setData({
      show: false,
    });
  },
  //获取销售中产品
  async getApprovalProductList(type) {
    console.log('xiaoshouzhong');
    try {
      let request = {}
      switch (type) {
        case 'search': request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [8],
              "searchText": this.data.value
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
        default: request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [8],
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
      }
      const result = await cloud.application.httpRequest(request);
      console.log(result);
      if (JSON.stringify(result) == '{}') {
        my.hideLoading();
        my.showToast({
          content: '服务器繁忙,请联系客服人员',
          duration: 4000,
        })
      } else {
        var productId = []
        for (let i = 0; i < result.data.list.length; i++) {
          result.data.list[i].isShow = true;
          productId.push(result.data.list[i].alibaba_product_id)
          for (var key in this.data.data4) {
            if (result.data.list[i].group_id != '' && result.data.list[i].group_id == this.data.data4[key].id) {
              result.data.list[i].group_name = this.data.data4[key].title
            } else if (result.data.list[i].group_id == "") {
              result.data.list[i].group_name = "未获取到分组信息"
            }
          }
          for (var key in this.data.data2) {
            if (result.data.list[i].product_type == this.data.data2[key].en_name) {
              result.data.list[i].product_type_id = this.data.data2[key].id
            }
          }
        }
        if (type == 'search' && this.data.pagenumber == 1) {
          this.setData({
            productList: []
          })
        }
        var arr = this.data.productList.concat(result.data.list)
        this.setData({
          productList: arr,
          list: arr,
          productTotal: result.data.count,
          productId: productId
        });
        if (result.data.count >= 0) {
          my.hideLoading()
        }
      }
    } catch (e) {
      my.showToast({
        content: '网络连接失败',
        success: () => {
          my.hideLoading()
        }
      })
    }
  },
  //获取评分信息
  async getAppProductScore() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.score/" + productId,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "id": productId,
          }
        },
        'exts': { "timeout": 10000 }
      });
      this.setData({

      });
    } catch (e) {
      console.log("cuowu")
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
      console.log(result)
      app.globalData.group = result.data
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
        data4: newGroupList
      });
    } catch (e) {
    }
  },
  //获取审核中产品
  async getAppReviewProductList(type) {
    console.log("shenhezhongchanpin");

    try {
      let request = {}
      switch (type) {
        case 'search': request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [4],
              "searchText": this.data.value
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
        default: request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [4],
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
      }
      const result = await cloud.application.httpRequest(request);
      if (JSON.stringify(result) == '{}') {
        my.hideLoading();
        my.showToast({
          content: '服务器繁忙,请联系客服人员',
          duration: 4000,
        })
      } else {
        for (let i = 0; i < result.data.list.length; i++) {
          result.data.list[i].isShow = true;
          for (var key in this.data.data4) {
            if (result.data.list[i].group_id != '' && result.data.list[i].group_id == this.data.data4[key].id) {
              result.data.list[i].group_name = this.data.data4[key].title
            } else if (result.data.list[i].group_id == "") {
              result.data.list[i].group_name = "未获取到分组信息"
            }
          }
          for (var key in this.data.data2) {
            if (result.data.list[i].product_type == this.data.data2[key].en_name) {
              result.data.list[i].product_type_id = this.data.data2[key].id
            }
          }
        }
        if (type == 'search' && this.data.pagenumber == 1) {
          this.setData({
            productList2: []
          })
        }
        var arr = this.data.productList2.concat(result.data.list)
        this.setData({
          productList2: arr,
          list2: arr,
          productTotal2: result.data.count,
        });
        if (result.data.count >= 0) {
          my.hideLoading()
        }
      }
    } catch (e) {

    }
  },
  //获取草稿箱产品
  async getAppDraftProductList(type) {
    console.log("caogaoxiangchanpin");
    try {
      let request = {}
      switch (type) {
        case 'search': request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [0],
              "searchText": this.data.value
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
        default: request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [0],
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
      }
      const result = await cloud.application.httpRequest(request);
      console.log(result);
      if (JSON.stringify(result) == '{}') {
        my.hideLoading();
        my.showToast({
          content: '服务器繁忙,请联系客服人员',
          duration: 4000,
        })
      } else {
        for (let i = 0; i < result.data.list.length; i++) {
          result.data.list[i].isShow = true;
          for (var key in this.data.data4) {
            if (result.data.list[i].group_id != '' && result.data.list[i].group_id == this.data.data4[key].id) {
              result.data.list[i].group_name = this.data.data4[key].title
            } else if (result.data.list[i].group_id == "") {
              result.data.list[i].group_name = "未获取到分组信息"
            }
          }
          for (var key in this.data.data2) {
            if (result.data.list[i].product_type == this.data.data2[key].en_name) {
              result.data.list[i].product_type_id = this.data.data2[key].id
            }
          }
        }
        if (type == 'search' && this.data.pagenumber == 1) {
          this.setData({
            productList3: []
          })
        }
        var arr = this.data.productList3.concat(result.data.list)
        this.setData({
          productList3: arr,
          list3: arr,
          productTotal3: result.data.count,
        });
        if (result.data.count >= 0) {
          my.hideLoading()
        }
      }
    } catch (e) {

    }
  },
  //获取发布失败产品
  async getAppFailedProductList(type) {
    console.log("发布失败");
    try {
      let request = {}
      switch (type) {
        case 'search': request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [5],
              "searchText": this.data.value
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
        default: request = {
          'path': 'index.php',
          'method': 'POST',
          'body': {
            "api": "/api/publish.yes.product",
            "method": "GET",
            "token": app.globalData.token,
            "data": {
              "page": this.data.pagenumber,
              "limit": 10,
              "status": [5],
            }
          },
          'exts': { "timeout": 10000 }
        }
          break;
      }
      const result = await cloud.application.httpRequest(request);
      console.log(result);
      if (JSON.stringify(result) == '{}') {
        my.hideLoading();
        my.showToast({
          content: '服务器繁忙,请联系客服人员',
          duration: 4000,
        })
      } else {
        for (let i = 0; i < result.data.list.length; i++) {
          result.data.list[i].isShow = true;
          for (var key in this.data.data4) {
            if (result.data.list[i].group_id != '' && result.data.list[i].group_id == this.data.data4[key].id) {
              result.data.list[i].group_name = this.data.data4[key].title
            } else if (result.data.list[i].group_id == "") {
              result.data.list[i].group_name = "未获取到分组信息"
            }
          }
          for (var key in this.data.data2) {
            if (result.data.list[i].product_type == this.data.data2[key].en_name) {
              result.data.list[i].product_type_id = this.data.data2[key].id
            }
          }
        }
        if (type == 'search' && this.data.pagenumber == 1) {
          this.setData({
            productList4: []
          })
        }
        var arr = this.data.productList4.concat(result.data.list)
        this.setData({
          productList4: arr,
          list4: arr,
          productTotal4: result.data.count,
        });
        if (result.data.count >= 0) {
          my.hideLoading()
        }
      }
    } catch (e) {

    }
  },
  //组件接收后返回
  SelectedItem: function (e) {
    var self = this
    var nowList = self.data.list
    var tabs = self.data.tabs
    var activeTab = self.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        nowList = self.data.list2;
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        nowList = this.data.list3;
      } else if (tabs[k].title == '发布失败' && activeTab == 3) {
        nowList = this.data.list4;
      }
    }
    let newList = [];
    const { index, selectedId, selectedTitle } = e
    self.select[index - 1] = selectedId
    console.log(self.select)
    for (let i in nowList) {
      if ((nowList[i].product_type_id == self.select['0'] || self.select['0'] == 0) && (nowList[i].data3id == self.select['1'] || self.select['1'] == 0) && (nowList[i].group_id == self.select['2'] || self.select['2'] == 0)) {
        newList.push(nowList[i])
      }
    }
    if (activeTab == 0) {
      self.setData({
        productList: newList
      })
    } else if (activeTab == 1) {
      self.setData({
        productList2: newList
      })
    } else if (activeTab == 2) {
      self.setData({
        productList3: newList
      })
    } else if (activeTab == 3) {
      self.setData({
        productList4: newList
      })
    }
  },
  //点击展示下架、删除
  showToggle: function (e) {
    var list1 = this.data.productList;
    var tabs = this.data.tabs
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        list1 = this.data.productList2;
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        list1 = this.data.productList3;
      } else if (tabs[k].title == '发布失败' && activeTab == 3) {
        list1 = this.data.productList4;
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
          productList2: list1
        })
      } else if (tabs[j].title == '草稿箱' && activeTab == 2) {
        this.setData({
          productList3: list1
        })
      } else if (tabs[j].title == '销售中' && activeTab == 0) {
        this.setData({
          productList: list1
        })
      } else if (tabs[j].title == '发布失败' && activeTab == 3) {
        this.setData({
          productList4: list1
        })
      }
    }
  },
  //手动删除无图产品
  delNoImageProduct(productId, pid) {
    this.delSubCaiShop(productId)
    this.delSubShop(pid)
  },
  //删除采集复制
  async delSubCaiShop(pid) {
    console.log(pid);
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/product",
        "method": "DELETE",
        "token": app.globalData.token,
        "data": {
          "ids": [pid]
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(result);
    if (result.msg == '删除成功') {
      my.hideToast();
    }
  },
  //删除待发布
  async delSubShop(pid) {
    console.log(pid);
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/publish.yes.product",
        "method": "DELETE",
        "token": app.globalData.token,
        "data": {
          "ids": [pid]
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(result);
    my.showToast({
      content: result.msg,
      icon: 'false',
    })
  },
  //删除商品
  delShop(e) {
    var that = this
    that.showToggle(e)
    var tabs = this.data.tabs
    var list1 = this.data.productList;
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        list1 = this.data.productList2;
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        list1 = this.data.productList3;
      } else if (tabs[k].title == '发布失败' && activeTab == 3) {
        list1 = this.data.productList4;
      }
    }
    var list1Copy = [];
    for (let it = 0; it < list1.length; it++) {
      //如果当前点击的对象id和循环对象里的id一致
      if (e.target.dataset.index == it) {
        my.confirm({
          title: '提示',
          content: '确认删除？？？',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          success: (result) => {
            if (result.confirm == true) {
              console.log(list1[it]);
              that.delSubShop(list1[it].pid);
              that.delSubCaiShop(list1[it].product_id);
              list1.splice(it, 1);
              for (var itIs in list1) {
                list1Copy.push(list1[itIs]);
              }
              if (activeTab == 0) {
                that.setData({
                  productList: list1Copy,
                  productTotal: this.data.productTotal - 1
                })
              } else if (activeTab == 1) {
                that.setData({
                  productList2: list1Copy,
                  productTotal2: this.data.productTotal2 - 1
                })
              } else if (activeTab == 2) {
                that.setData({
                  productList3: list1Copy,
                  productTotal3: this.data.productTotal3 - 1
                })
              } else if (activeTab == 3) {
                that.setData({
                  productList4: list1Copy,
                  productTotal4: this.data.productTotal4 - 1
                })
              }
            } else {
              if (activeTab == 0) {
                that.setData({
                  productList: list1
                })
              } else if (activeTab == 1) {
                that.setData({
                  productList2: list1
                })
              } else if (activeTab == 2) {
                that.setData({
                  productList3: list1
                })
              } else if (activeTab == 3) {
                that.setData({
                  productList4: list1
                })
              }
            }
            //this.onPullDownRefresh();
          },
        });
      }
    }
  },
  async offSubShop(pid) {
    console.log(pid);
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/publish.display",
        "method": "POST",
        "token": app.globalData.token,
        "data": {
          "ids": [pid],
          "type": "off"
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(result);
    my.showToast({
      content: result.msg,
      icon: 'false',
      duration: 2000
    })
  },
  //下架商品
  offShop(e) {
    var that = this
    that.showToggle(e)
    var list1 = this.data.productList;
    var activeTab = this.data.activeTab
    var list1Copy = [];
    for (let it = 0; it < list1.length; it++) {
      //如果当前点击的对象id和循环对象里的id一致
      if (e.target.dataset.index == it) {
        my.confirm({
          title: '提示',
          content: '确认下架???',
          confirmButtonText: '下架',
          cancelButtonText: '取消',
          success: (result) => {
            if (result.confirm == true) {
              console.log(list1[it].pid);
              that.offSubShop(list1[it].pid);
              list1.splice(it, 1);
              for (var itIs in list1) {
                list1Copy.push(list1[itIs]);
              }
              if (activeTab == 0) {
                that.setData({
                  productList: list1Copy,
                  productTotal: this.data.productTotal - 1
                })
              }
            } else {
              if (activeTab == 0) {
                that.setData({
                  productList: list1
                })
              }
            }
          },
        });
      }
    }
  },

  onLoad() {
    my.showLoading({
      content: '加载中...',
      delay: 0,
    });
    my.getStorage({
      key: 'time',
      success: (result) => {
        console.log(result);
        if (result.data == null) {
          this.setData({
            SYNCTime: ''
          })
        } else {
          this.setData({
            SYNCTime: result.data.SYNCTime
          })
        }
      }
    });
    this.getSystemInfo();
    this.getShippingTpl();
    my.setNavigationBar({
      title: '闪电手',
      backgroundColor: '#108ee9',
      success() {
      },
      fail() {
        my.alert({
          content: '设置是失败',
        });
      },
    });
    var activeT = app.globalData.activeT;
    console.log(activeT, 'onload标记');
    if (activeT == undefined) {
      this.setData({
        activeTab: 0
      })
    } else {
      this.setData({
        activeTab: activeT
      })
    }
    this.getAliGroupList();
  },
  onShow() {
    this.select = [0, 0, 0];
    let nowActiveT = app.globalData.activeT;
    if (nowActiveT > 0) {
      this.onPullDownRefresh()
      this.setData({
        activeTab: nowActiveT,
        pagenumber: 1
      });
    }
  },
  /**
* 刷新页面，页面设置点击刷新事件
*/
  onPullDownRefresh() {
    var that = this
    that.getAliGroupList()
    that.setData({
      productList: [],
      productList2: [],
      productList3: [],
      productList4: [],
      pagenumber: 1
    })
    that.onReady()
    that.stopPullDownRefresh()
  },
  stopPullDownRefresh() {
    setTimeout(() => { // 做个延迟效果
      my.stopPullDownRefresh()
    }, 3000)
  },
  onReachBottom: function () { //触底开始下一页
    console.log(this.select)
    var that = this;
    var page = that.data.pagenumber
    var tabs = this.data.tabs
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        page = that.data.pagenumber
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        page = that.data.pagenumber
      }
    }
    if ((that.select['0'] == 0 && that.select['1'] == 0 && that.select['2'] == 0 && that.data.productList.length < that.data.productTotal) || (that.select['0'] == 0 && that.select['1'] == 0 && that.select['2'] == 0 && that.data.productList2.length < that.data.productTotal2) || (that.select['0'] == 0 && that.select['1'] == 0 && that.select['2'] == 0 && that.data.productList3.length < that.data.productTotal3) || (that.select['0'] == 0 && that.select['1'] == 0 && that.select['2'] == 0 && that.data.productList4.length < that.data.productTotal4)) {
      var osl = that.data.onShowLoading
      console.log(this.data.scrolltopNum, "上拉触底")
      that.setData({
        onShowLoading: !osl
      })
      for (var k in tabs) {
        if (tabs[k].title == '审核中' && activeTab == 1) {
          var page1 = page + 1; //获取当前页数并+1
          that.setData({
            pagenumber: page1, //更新当前页数
          })
        } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
          var page1 = page + 1; //获取当前页数并+1
          that.setData({
            pagenumber: page1, //更新当前页数
          })
        } else {
          var page1 = page + 1; //获取当前页数并+1
          that.setData({
            pagenumber: page1, //更新当前页数
          })
        }
      }
      if (that.data.scrolltopNum != 248) {
        console.log(that.data.pagenumber)
        that.getpageData();//重新调用请求获取下一页数据
        my.showLoading({
          content: '加载中...'
        })
      }
    } else {
      console.log("上拉触底未加载" + page)
    }
  },
  getpageData: function () {
    var that = this
    var arr1 = that.data.productList; //从data获取当前lister数组
    var tabs = this.data.tabs
    var activeTab = this.data.activeTab
    for (var k in tabs) {
      if (tabs[k].title == '审核中' && activeTab == 1) {
        if (this.data.value != '') {
          this.getAppReviewProductList('search');
          return;
        }
        this.getAppReviewProductList();
      } else if (tabs[k].title == '草稿箱' && activeTab == 2) {
        if (this.data.value != '') {
          this.getAppDraftProductList('search');
          return;
        }
        this.getAppDraftProductList();
      } else if (tabs[k].title == '销售中' && activeTab == 0) {
        if (this.data.value != '') {
          this.getApprovalProductList('search');
          return;
        }
        this.getApprovalProductList();
      } else if (tabs[k].title == '发布失败' && activeTab == 3) {
        if (this.data.value != '') {
          this.getAppFailedProductList('search');
          return;
        }
        this.getAppFailedProductList();
      }
    }
    setTimeout(() => { // 做个延迟效果
      my.hideLoading(); // 数据加载完成之后隐藏loading提示框
    }, 1000)
  },
  handleInput(value) {
    this.setData({
      value,
    })
  },
  inputSearch() {
    if (this.data.systemInfo.platform == 'Android') {
      this.setData({
        topNum1: 9,
        topNum2: 20,
        topNum3: 29,
      })
    }
  },
  inputSearch1() {
    if (this.data.systemInfo.platform == 'Android') {
      this.setData({
        topNum1: 6,
        topNum2: 14,
        topNum3: 20,
      })
    }
  },
  search(e) {
    console.log(e);
    this.setData({
      pagenumber: 1
    })
    var activeTab = this.data.activeTab
    console.log(activeTab);
    switch (activeTab) {
      case 1: this.getAppReviewProductList('search');
        break;
      case 2: this.getAppDraftProductList('search');
        break;
      case 3: this.getAppFailedProductList('search');
        break;
      case 0: this.getApprovalProductList('search')
        break;
      default:
        break;
    }
  },
  //回到顶部
  returnTop: function () {
    console.log('进入');
    my.pageScrollTo({
      scrollTop: parseInt(this.data.scrolltop),
      duration: 200,
    });
    this.setData({
      pagenumber: 1,
    })
  },
  onPageScroll(e) {
    //console.log(e);
    this.setData({
      scrolltopNum: e.scrollTop
    })
  },
  handleTabClick({ index }) {
    this.returnTop()
    this.setData({
      activeTab: index,
      value: '',
      productList: [],
      productList2: [],
      productList3: [],
      productList4: [],
      scrolltopNum: 0
    });
    let activeTab = this.data.activeTab
    console.log(activeTab, '点击Tabs标记');
    switch (activeTab) {
      case 1: my.showLoading({
        content: '加载中...',
        success: () => {
          this.setData({
            pagenumber: 1,
          })
          this.getAppReviewProductList();
        }
      })
        break;
      case 2: my.showLoading({
        content: '加载中...',
        success: () => {
          this.setData({
            pagenumber: 1,
          }); this.getAppDraftProductList();
        }
      })
        break;
      case 3: my.showLoading({
        content: '加载中...',
        success: () => {
          this.setData({
            pagenumber: 1,
          }); this.getAppFailedProductList();
        }
      })
        break;
      case 0: my.showLoading({
        content: '加载中...',
        success: () => {
          this.setData({
            pagenumber: 1,
          })
          this.getApprovalProductList();
        }
      })
        break;
      default:
        break;
    }
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  getSystemInfo() {
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res,
        })
        console.log(this.data.systemInfo)
        app.globalData.systemName = res.platform
        if (this.data.systemInfo.brand == undefined) {
          my.alert({
            title: '提示',
            content: '未获取到设备信息',
            buttonText: '关闭',
            success: () => {
              my.switchTab({
                url: '',
                success: () => {

                }
              });
            }
          });
        } else {
          if (this.data.systemInfo.platform == 'Android') {
            this.setData({
              topNum: 0,
              topNum1: 6,
              topNum2: 14,
              topNum3: 20,
              bgHeight: 0,
              marginTop: -18,
            })
          }
        }
      }
    })
  },

  nextStep(e) {
    let list1 = this.data.productList3;
    if (this.data.activeTab == 3) {
      list1 = this.data.productList4;
    }
    let list1Copy = []
    for (let i = 0; i < list1.length; i++) {
      if (e.target.dataset.index == i) {
        my.confirm({
          title: '提示',
          content: '确认发布？？？',
          confirmButtonText: '发布',
          cancelButtonText: '取消',
          success: (result) => {
            console.log(result)
            if (result.confirm == true) {
              console.log(list1[i]);
              this.faBuOnline(list1[i].pid);
              list1.splice(i, 1);
              for (var itIs in list1) {
                list1Copy.push(list1[itIs]);
              }
              switch (this.data.activeTab) {
                case 2: this.setData({
                  productList3: list1Copy,
                  activeTab: 1,
                  productTotal3: this.data.productTotal3 - 1
                })
                  break;
                case 3: this.setData({
                  productList4: list1Copy,
                  activeTab: 1,
                  productTotal4: this.data.productTotal4 - 1
                })
                  break;
                default:
                  break;
              }
            } else {
              switch (this.data.activeTab) {
                case 0: this.setData({
                  productList: list1
                })
                  break;
                case 1: this.setData({
                  productList2: list1
                })
                  break;
                case 2: this.setData({
                  productList3: list1
                })
                  break;
                case 3: this.setData({
                  productList4: list1
                })
                  break;
                default:
                  break;
              }
            }
          }
        });
      }
    }
  },
  async faBuOnline(pid) {
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/publish.online",
        "method": "POST",
        "token": app.globalData.token,
        "data": {
          "ids": [pid]
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(result);
  },
  async getShippingTpl() {
    //获取运费模板列表
    var requestTplShipping = {
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/common/ali.ship",
        "method": "GET",
        "token": app.globalData.token,
        "data": {
          "id": -1,
        }
      },
      'exts': { "timeout": 10000 }
    };
    const resTplShipping = await cloud.application.httpRequest(requestTplShipping)
    console.log(resTplShipping)
    var shippingTpl = []
    for (const key in resTplShipping.data) {
      shippingTpl.push({
        id: key,
        text: resTplShipping.data[key],
        selectedId: key,
        type: 'shippingTpl'
      })
    }
    app.globalData.shippingTpl = shippingTpl
    console.log(app.globalData.shippingTpl);
  },
  //编辑商品详情
  editProductInfo(e) {
    console.log(e);
    my.showToast({
      content: '正在获取产品信息',
      success: () => {
        this.setData({
          showMaskTap: true
        })
        app.globalData.errorInfo = e.target.dataset.error
        my.showLoading({
          content: '加载中...'
        })
        this.getProductInfoForId(e.target.dataset.id, e.target.dataset.status)
      }
    })
  },
  async getProductInfoForId(pid, status) {
    try {
      var request = {
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.yes.product/" + pid,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "pid": -1
          }
        },
        'exts': { "timeout": 10000 }
      };
      const result = await cloud.application.httpRequest(request)
      console.log(result);
      if (result.msg == "获取成功") {
        my.hideToast()
        my.hideLoading()
        this.setData({
          showMaskTap: false
        })
        // my.navigateTo({
        //   url: '/pages/editProduct/editProduct',
        //   success: () => {
        //     app.globalData.productInfo = result.data
        //   }
        // });
        my.navigateTo({
          url: '/pages/publishProduct/publishProduct',
          success: () => {
            app.globalData.productInfo = result.data
            app.globalData.activeIndex = 3
          }
        });
      }
      if (JSON.stringify(result) == '{}') {
        my.hideLoading()
        my.hideToast({
          success: () => {
            my.showToast({
              content: '获取失败：网络连接错误',
              duration: 2000,
              success: () => {
                this.setData({
                  showMaskTap: false
                })
              }
            })
          }
        })
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
  tongBuProCount() {
    /**
      * 每隔一段时间请求服务器刷新数据(客户状态)
      * 当页面显示时开启定时器(开启实时刷新)
      * 每隔1分钟请求刷新一次
      * @注意：用户切换后页面会重新计时
      */
    let that = this
    that.tongbuPro()
    this.data.sys = setInterval(function () { that.tongBuProCountS() }, 2000)//间隔时间
  },
  async tongbuPro() {
    const result = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/sys.online.product",
        "method": "GET",
        "token": app.globalData.token,
        "data": {
          "id": -1
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(result);
    if (result.code == 200) {
      my.showToast({
        content: result.msg,
        success: () => {
          my.hideToast()
          my.showToast({
            content: result.data['msg '],
            duration: 2000,
          })
        }
      })
    }
  },
  async tongBuProCountS() {
    var myDate = new Date();
    // myDate.getYear();        //获取当前年份(2位)
    // myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    // myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    // myDate.getDate();        //获取当前日(1-31)
    // myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    // myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
    // myDate.getHours();       //获取当前小时数(0-23)
    // myDate.getMinutes();     //获取当前分钟数(0-59)
    // myDate.getSeconds();     //获取当前秒数(0-59)
    // myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    // myDate.toLocaleDateString();     //获取当前日期
    // myDate.toLocaleTimeString();     //获取当前时间
    var mytime = myDate.toLocaleString();        //获取日期与时间
    console.log(mytime);
    const results = await cloud.application.httpRequest({
      'path': 'index.php',
      'method': 'POST',
      'body': {
        "api": "/api/sys.online.product.count",
        "method": "GET",
        "token": app.globalData.token,
        "data": {
          "id": -1
        }
      },
      'exts': { "timeout": 10000 }
    });
    console.log(results);
    if (results.code == 200 && results.msg == '同步进行中') {
      if (results.data.queueCount > 0) {
        this.setData({
          SYNCInfo: '等待同步：前面' + results.data.queueCount + '件商品正在同步'
        })
      } else {
        this.setData({
          SYNCInfo: results.msg + '(' + results.data.successedCount + '/' + results.data.totalCount + ')'
        })
      }
      if (results.data.totalCount == results.data.successedCount) {// 条件
        this.setData({
          SYNCInfo: '同步完成(成功：' + results.data.successedCount + ',失败：' + results.data.failedCount + ')',
          SYNCTime: '', // 正确数据-----'上次同步时间：' + mytime
        })
        setTimeout(() => {
          this.setData({
            SYNCInfo: ''
          })
          my.setStorage({
            key: 'time',
            data: { SYNCTime: this.data.SYNCTime },
            success: () => {
              console.log('设置成功');
            }
          });
          my.getStorage({
            key: 'time',
            success: (result) => {
              console.log(result);
              if (result.data == null) {
                this.setData({
                  SYNCTime: ''
                })
              } else {
                this.setData({
                  SYNCTime: result.data.SYNCTime
                })
              }
            }
          });
          clearInterval(this.data.sys)
        }, 3000);
      }
    } else if (results.msg == '没有同步在执行') {
      this.setData({
        SYNCInfo: results.msg,
        SYNCTime: '', // 正确数据-----'上次同步时间：' + mytime
      })
      setTimeout(() => {
        this.setData({
          SYNCInfo: '',
        })
        my.setStorage({
          key: 'time',
          data: { SYNCTime: this.data.SYNCTime },
          success: () => {
            console.log('设置成功');
          }
        });
        my.getStorage({
          key: 'time',
          success: (result) => {
            console.log(result);
            if (result.data == null) {
              this.setData({
                SYNCTime: ''
              })
            } else {
              this.setData({
                SYNCTime: result.data.SYNCTime
              })
            }
          }
        });
        clearInterval(this.data.sys)
      }, 3000);
    }
  },
  //页面隐藏
  onHide: function () {
    console.log("关闭");
    this.setData({
      show: false
    })
    /**
     * 当页面隐藏时关闭定时器(关闭点击同步实时刷新)
     * 切换到其他页面了
     */
    //clearInterval(this.data.sys)
  },
  /* 带图弹窗 */
  openModal21() {
    this.setData({
      modalOpened21: true,
    });
  },
  showBigImage(e) {
    my.previewImage({
      current: 0,
      enableShowPhotoDownload: false,
      enablesavephoto: true,
      urls: [this.data.productList[e.target.dataset.index].image.url],
    });
  },
  showErrorInfo(e) {
    my.alert({
      title: '错误日志',
      content: e.target.dataset.error,
      buttonText: '关闭'
    });
  },
  onRightItemClick(e) {
    const { type } = e.detail;
    my.confirm({
      title: '温馨提示',
      content: `${e.index}-${e.extra}-${JSON.stringify(e.detail)}`,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        const { list } = this.data;
        if (result.confirm) {
          if (type === 'delete') {
            list.splice(this.data.swipeIndex, 1);
          }
          my.showToast({
            content: '确定 => 执行滑动删除还原',
          });
          e.done();
        } else {
          my.showToast({
            content: '取消 => 滑动删除状态保持不变',
          });
        }
      },
    });
  },
  onItemClick(e) {
    my.alert({
      content: `dada${e.index}`,
    });
  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index,
    });
  },
});