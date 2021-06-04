
const { cloud } = getApp();
var app = getApp();
Page({
  data: {
    show: true,
    modelName: '',//publishAdd页面跳转转递过来的模板名称值
    startId: 0,//默认发起请求的id
    id: '',// 跳转到toAdd页面的携带的id值
    id_path: '',// 跳转到toAdd页面的携带的id_path字符串值    
    id_path_first: '',// 平台分类第一层id_path    
    id_path_second: '',// 平台分类第二层id_path  
    id_path_third: '',  // 平台分类第三层id_path
    display: 'none',
    value: [],
    sort: 1,
    items1: [
    ],
    items2: [

    ],
    items3: [

    ],
    items4: [
    ]
  },
  onItemClick1(e) {
    this.setData({
      display: 'block',
      value: [this.data.items1[e.index].zh_name],
      sort: 2,
      id_path_first: e.target.dataset.id_path_first,
      id: e.target.dataset.id_path_first,
      id_path: e.target.dataset.id_path_i_first
    })
    // 分类点击获取leaf
    const leaf = e.target.dataset.leaf
    if (leaf == 1) {
      this.toPublishRemove()
    }
    this.GetCommonAliCategorySecond()

  },
  onItemClick2(e) {


    let value = [this.data.value[0]];
    value[1] = this.data.items2[e.index].zh_name;
    this.setData({
      display: 'block',
      value: value,
      sort: 3,
      id_path_second: e.target.dataset.id_path_second,
      id: e.target.dataset.id_path_second,
      id_path: e.target.dataset.id_path_i_second
    })
    const leaf = e.target.dataset.leaf
    if (leaf == 1) {
      this.toPublishRemove()
    }
    this.GetCommonAliCategoryThird()

  },
  onItemClick3(e) {

    let value = [this.data.value[0], this.data.value[1]];
    value[2] = this.data.items3[e.index].zh_name;
    this.setData({
      display: 'block',
      value: value,
      sort: 4,
      id_path_third: e.target.dataset.id_path_third,
      id: e.target.dataset.id_path_third,
      id_path: e.target.dataset.id_path_i_third
    })
    const leaf = e.target.dataset.leaf
    if (leaf == 1) {
      this.toPublishRemove()
    }
    this.GetCommonAliCategoryFour()
  },


  onItemClick4(ev) {

    let value = this.data.value;
    value[3] = this.data.items4[ev.index].zh_name;
    console.log(value);
    this.setData({
      display: 'block',
      value: value,
      sort: 4,
      id: ev.target.dataset.id_path_four,
      id_path: ev.target.dataset.id_path_i_four
    });
    const leaf = ev.target.dataset.leaf
    if (leaf == 1) {
      this.toPublishRemove()
    }

  },

  // 导航栏添加取消分类
  toSort(e) {
    let { index } = e.target.dataset;
    const valueMiddle = [];
    for (let i = 0; i < this.data.value.length; i++) {
      if (index > i) {
        valueMiddle.push(this.data.value[i])
      }
    }
    this.setData({
      value: valueMiddle,
      sort: index + 1
    })
  },



  onLoad(options) {
    const modelName = options.modelName
    let value = []
    // 新建页面切换带过来的平台分类id字符串
    const id_path = options.id_path.split('/')
    // 新建页面切换带过来的平台分类value字符串
    if (options.value != "") {
      value = options.value.split('/')
    } else {
      value = []
    }
    // 数组长度
    const long = id_path.length
    // let longLater = ''
    let size = ''
    for (let index = 0; index < id_path.length; index++) {
      if (long - 1 == index) {
        // longLater = id_path[long - 2]
        size = long
      }
    }
    for (let index = 0; index < id_path.length; index++) {
      if (index == 0) {
        this.setData({
          startId: '0'
        })
        this.GetCommonAliCategory()
      } else if (index == 1) {
        this.setData({
          id_path_first: id_path[0]
        })
        this.GetCommonAliCategorySecond()

      } else if (index == 2) {
        this.setData({
          id_path_second: id_path[1]
        })
        this.GetCommonAliCategoryThird()

      } else {
        this.setData({
          id_path_third: id_path[2]
        })
        this.GetCommonAliCategoryFour()
      }
    }// 

    switch (size) {
      case 1:
        break;
      case 2:
        this.setData({
          sort: size
        })
        break;
      case 3:
        this.setData({
          sort: size
        })
        break;
      default:
        this.setData({
          sort: size
        })
        break;
    }
    this.setData({
      value: value,
      display: 'block',
      modelName: modelName
    })
    if (options.value != null) {
      this.GetCommonAliCategory()
    }
  },
  // 平台分类第一次请求
  async GetCommonAliCategory() {
    my.showLoading({
      content: '加载中...',
      delay: 0,
    })
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/alicategory/' + this.data.startId,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      if (result.code == 200) {
        my.hideLoading()
        this.setData({
          items1: result.data
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  // 平台分类第二次请求
  async GetCommonAliCategorySecond() {
    my.showLoading({
      content: '加载中...',
      delay: 0,
    });
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/alicategory/' + this.data.id_path_first,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      if (result.code == 200) {
        my.hideLoading()
        this.setData({
          items2: result.data
        })
      }
    } catch (e) {
      console.log(e);
    }
  },

  // 平台分类第三次请求
  async GetCommonAliCategoryThird() {
    my.showLoading({
      content: '加载中...',
      delay: 0,
    });
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/alicategory/' + this.data.id_path_second,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      if (result.code == 200) {
        my.hideLoading()
        this.setData({
          items3: result.data
        })
      }
    } catch (e) {
      console.log(e);
    }
  },

  // 平台分类第三次请求
  async GetCommonAliCategoryFour() {
    my.showLoading({
      content: '加载中...',
      delay: 0,
    });
    try {
      const result = await cloud.application.httpRequest({
        'path': 'index.php',
        'method': 'POST',
        'body': {
          "api": '/api/common/alicategory/' + this.data.id_path_third,
          "method": "GET",
          "token": app.globalData.token,
          "data": {
            'id': -1
          }
        },
        'exts': { "timeout": 10000 }
      });
      if (result.code == 200) {
        my.hideLoading()
        this.setData({
          items4: result.data
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  toPublishRemove() {
    let value = JSON.stringify(this.data.value)
    my.navigateTo({
      url: '../publishAdd/publishAdd/?id=' + this.data.id + "&id_path=" + this.data.id_path + "&value=" + value + "&modelName=" + this.data.modelName
    })
  }
});
