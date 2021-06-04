const { cloud } = getApp();
var app = getApp();

Page({
  data: {
    // 添加模板提示
    bottomNumber: 78,
    leftNumber: 24,
    topNUmber: -15,
    marginLeftNumber: 96,
    //去发布提示
    number1: 66,
    number2: 20,
    number3: -15,
    number4: 96,

    showKnow: false, //添加模板提示
    showPublish: false, //去发布提示
    paddingTop: 300,
    marginTop: 78,
    produceId: 0, //分类id
    // 产品属性和规格值请求id
    alibaba_category_id: 0,
    have_sku: [], //产品规格值
    no_sku: [],//产品属性值
    // 搜索框输入的值
    value: '',
    // 详情模板总数
    count: '',
    onShowLoading: true,
    page: 1,
    deleteId: 0,
    listSearch: [],
    list: [],
  },
  onPullDownRefresh() {
    this.setData({
      list: [],
      page: 1
    })
    this.getApprovalProductList()
    this.stopPullDownRefresh()
  },
  stopPullDownRefresh() {
    setTimeout(() => { // 做个延迟效果
      my.stopPullDownRefresh()
    }, 1000)
  },
  onReady() {
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
    this.getSystemInfo();
  },
  getSystemInfo() {
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res,
        })
        console.log(this.data.systemInfo)
        if (this.data.systemInfo.brand == undefined) {
          my.alert({
            title: '提示',
            content: '未获取到设备信息',
            buttonText: '关闭',
          });
        } else {
          if (this.data.systemInfo.platform == 'Android') {
            this.setData({
              marginTop: -46,
              paddingTop: 176
            })
          }
        }
      }
    })
  },

  onHide() {
    this.setData({
      showKnow: false, //添加模板提示
      showPublish: false,//去发布提示
      value: ''
    })
  },

  onShow() {
    this.setData({
      page: 1,
      list: []

    })
    console.log(app.globalData.systemName, '系统');

    console.log(this.data.list, 'list11111111');
    this.getApprovalProductList();

  },
  //获取销售中产品
  async getApprovalProductList(type) {
    try {
      let result = {}
      switch (type) {
        case 'search':
          result = await cloud.application.httpRequest({
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/publish.tpl",
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "page": this.data.page,
                "limit": 6,
                'name': this.data.value,
                'status': 1
              }
            },
            'exts': { "timeout": 10000 }
          })
          break;
        default:
          result = await cloud.application.httpRequest({
            'path': 'index.php',
            'method': 'POST',
            'body': {
              "api": "/api/publish.tpl",
              "method": "GET",
              "token": app.globalData.token,
              "data": {
                "page": this.data.page,
                "limit": 6
              }
            },
            'exts': { "timeout": 10000 }
          })
          break;
      }

      console.log(this.data.list, '7889');
      var arr = this.data.list.concat(result.data.list)
      console.log(result.data);
      this.setData({
        list: arr,
        listSearch: arr,
        count: result.data.count,
        page: this.data.page + 1
      });

      if (app.globalData.systemName == 'Android') {
        switch (result.data.count) {
          case 2:
            this.setData({
              showKnow: true,
              bottomNumber: 89,
              leftNumber: 24,
              topNUmber: -15,
              marginLeftNumber: 96,
            })
            break;
          case 3:
            this.setData({
              showPublish: true,
              number1: 77,
              number2: 20,
              number3: -15,
              number4: 96
            })
          default:
            break;
        }
      } else {
        console.log(this.data.showKnow, this.data.showPublish, '1和2');
        if (result.data.count == 2) {
          this.setData({
            showKnow: true,
            bottomNumber: 78,
            leftNumber: 24,
            topNUmber: -15,
            marginLeftNumber: 96
          })
        } else if (result.data.count == 3) {
          this.setData({
            showPublish: true,
            number1: 66,
            number2: 20,
            number3: -15,
            number4: 96
          })
        } else {
          this.setData({
            showKnow: false,
            showPublish: false
          })
        }
      }
      setTimeout(() => { // 做个延迟效果
        my.hideLoading(); // 数据加载完成之后隐藏loading提示框
      }, 1000)
    } catch (e) {
    }
  },
  deleteId(e) {
    this.setData({
      visible: true,
      deleteId: e.target.dataset.id,
    })
  },
  onModalClick() {
    this.deleteApprovalProductList();
  },
  async deleteApprovalProductList() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.tpl",
          "method": "DELETE",
          "token": app.globalData.token,
          "data": {
            "tplIds": [this.data.deleteId],
            "status": -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      if (result.code === 200) {
        this.getApprovalProductListDelete();
        this.setData({
          visible: false
        });

        my.showToast({
          type: 'success',
          content: '删除成功',
          duration: 3000,
          success: () => {

          },
        });
      }
    } catch (e) {
    }
  },

  onModalClose() {
    this.setData({
      visible: false,
    });
  },

  onReachBottom() {
    console.log("上滑了");
    if (this.data.value == '' && this.data.list.length < this.data.count) {
      this.getApprovalProductList();
      my.showLoading({
        content: '加载中...'
      })
    } else {
      console.log("meiyougengduole")
    }
  },

  //删除之后获取销售中产品
  async getApprovalProductListDelete() {
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
      var arr = result.data.list
      console.log(result.data);
      this.setData({
        list: arr,
        count: result.data.count,
      });
      console.log(this.data.list);
      setTimeout(() => { // 做个延迟效果
        my.hideLoading(); // 数据加载完成之后隐藏loading提示框
      }, 1000)
    } catch (e) {
    }
  },


  handleInput(value) {
    console.log(value)
    this.setData({
      value,
    })
  },
  // 搜索框取消
  handleClear(value) {
    this.setData({
      value: '',
    });
  },

  // 搜索
  search(e) {
    this.setData({
      page: 1,
      list: []
    })
    this.getApprovalProductList('search');
    // console.log("进入搜索");
    // console.log(value)
    // var nowLister = this.data.listSearch
    // var newLister = [];
    // for (var i in nowLister) {
    //   var num = nowLister[i].name.indexOf(value);
    //   if (num != -1) {
    //     newLister.push(nowLister[i])
    //   }
    // };
    // if (value == "") {
    //   this.setData({
    //     list: nowLister
    //   })
    // } else {
    //   this.setData({
    //     list: newLister
    //   })
    // }
  },




  // 跳转添加创建模板中心
  toAdd() {
    my.navigateTo({ url: '../publishAdd/publishAdd' })
  },

  // 跳转模板编辑详情
  toEdit: function (event) {
    // 发起请求获取产品属性和规格
    const alibaba_category_id = event.target.dataset.alibaba_category_id
    const produceId = event.target.dataset.produce_id;
    this.setData({
      alibaba_category_id: alibaba_category_id,
      produceId: produceId,
    })
    // 阿里属性值获取
    this.GetAttr()
  },

  async GetAttr() {
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/common/aliattribute/" + this.data.alibaba_category_id,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      this.setData({
        have_sku: result.data.have_sku,
        no_sku: result.data.no_sku
      })
      this.toPublishRemove()
    } catch (e) {
    }
  },
  toPublishRemove() {
    const have_sku = this.data.have_sku
    const no_sku = this.data.no_sku
    app.globalData.tempNoSku = no_sku
    app.globalData.tempHaveSku = have_sku
    my.navigateTo({
      url: "../publishRemove/publishRemove?produceId=" + this.data.produceId,
      success: (res) => {
        console.log('跳转成功');
      }
    });
  },
  // 发布模板跳转到拍照发品页面
  goPublish(e) {
    const id = e.target.dataset.id
    my.navigateTo({
      url: "../publishProduct/publishProduct?mobanId=" + id,
      success: (res) => {
        console.log('跳转成功');
        app.globalData.activeIndex = 1
      }
    });
  },
  onKnowTap() {
    this.setData({
      showKnow: false
    })
  },
  onPublishTap() {
    this.setData({
      showPublish: false
    })
  }
});