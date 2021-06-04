const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    marginTop: 18,
    //acc: [],
    all: [],
    //all1: [],
    common: [],
    industry: [],
    custom: [],
    //hangye1: [],
    tabsType: [//标签数组
      { ref: "page0", status: '1' },
      { ref: "page1", status: '2' },
      { ref: "page2", status: '3' },
      { ref: "page3", status: '4' }
    ],

    loadFlags: 0x0000,//各tab是否加载
    tabs: [
      { title: '全部' },
      { title: '通用模板' },
      { title: '行业模板' },
      { title: '自定义' }
    ],
    activeTab: 0,
    footer: false,
    modalOpened:false,
    previewImg:'',
    showImageSelectTop: false,
    scrollTop:100,
  },
  page0(ref) {
    this.page0 = ref;
  },
  page1(ref) {
    this.page1 = ref;
  },
  page2(ref) {
    this.page2 = ref;
  },
  page3(ref) {
    this.page3 = ref;
  },
  onLoad() {
    my.setNavigationBar({
      title: '闪电手',
      backgroundColor: '#108ee9'
    });
    this.getSystemInfo()
    this.setData({
      loadFlags: 0x0001
    });
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
              marginTop:2
            })
          }
        }
      }
    })
  },
  //下拉刷新
  // onPullDownRefresh() {
  //   this.onRefresh();
  // },

  //标签切换
  handleTabClick(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.current
    })
    console.log('当前标签下表', e.currentTarget.dataset.current)
  },
  //手势滑动
  handleTabChange(e) {
    var cur = e.detail.current; //拿到滑动当前页的下标
    console.log('当前滑动下标' + cur)
    if (this.data.activeTab == cur) {
      return false;
    } else {
      this.setData({
        activeTab: cur
      })
    }

  },
  onRefresh: function () {
    if (this.data.activeTab === 0) {
      this.page0.onRefresh();
    } else if (this.data.activeTab === 1) {
      this.page1.onRefresh();
    } else if(this.data.activeTab === 2){
      this.page2.onRefresh();
    }else {
      this.page3.onRefresh();
    }
  },
  imgYu(event) {//图片点击事件
    let index = event.currentTarget.dataset.index;//获取下标index
    let item = event.currentTarget.dataset.item;//获取图片集合list
    //图片预览
    this.setData({
      showImageSelectTop: true,
      previewImg:item.template_image,
    });
  },
  onPopupClose() {
    this.setData({
      showImageSelectTop: false,
    });
  },
  scroll(e) {
    this.setData({
      scrollTop: e.detail.scrollTop,
    });
  },
  async onShow() {
    //全部
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.template",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 1,
            "limit": 100
          }
        },
        'exts': { "timeout": 10000 }
      });
      for (const key in result.data.list) {
          const template = result.data.list[key];
          if(template.industry_type == 1){
            this.data.common.push(template);
          }else{
            this.data.industry.push(template);
          }
          this.data.all.push(template);

      }
      this.setData({
        all: this.data.all,
        common: this.data.common,
        industry: this.data.industry
      });
    } catch (e) {

    }

    //自定义模板
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": "/api/publish.template",
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            "page": 1,
            "limit": 100,
            "accessType":"miniapp",
            "memberId":1
          }
        },
        'exts': { "timeout": 10000 }
      });
      this.setData({
        custom: result.data.list,
      });
    } catch (e) {

    }
  },

});